import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { generateDummyData } from "./business/generators/generateDummyData";
import type { DummyData } from "./business/types";
import { formSchema } from "./formSchema";
import { GeneratedDataCard } from "./GeneratedDataCard";
import { SetUpSchemaCard } from "./SetUpSchemaCard";

function App() {
  const [dummyData, setDummyData] = useState<DummyData | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schemas: [
        {
          entity: "",
          fields: [{ key: "", value: "", type: "" }],
          amount: 1 as unknown as number,
        },
      ],
    },
  });

  const {
    fields: schemas,
    append: appendSchema,
    remove: removeSchema,
  } = useFieldArray({
    control: form.control,
    name: "schemas",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const dummyData = generateDummyData(data.schemas);
    setDummyData(dummyData);
  }

  return (
    <div className="bg-background flex h-screen w-screen flex-col items-center gap-2 p-4">
      <h1 className="text-primary mb-2 text-center text-4xl font-bold">
        Dummy Data Generator
      </h1>
      <div className="flex h-[90vh] gap-4">
        <SetUpSchemaCard
          schemas={schemas}
          appendSchema={appendSchema}
          removeSchema={removeSchema}
          form={form}
          onSubmit={onSubmit}
        />
        <GeneratedDataCard dummyData={dummyData} />
      </div>
    </div>
  );
}

export default App;
