import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { generateDummyData } from "../business/generators/generateDummyData";
import type { DummyData } from "../business/types";
import { formSchema } from "./form/formSchema";
import { GeneratedDataCard } from "./GeneratedDataCard";
import { SetUpSchemaCard } from "./SetUpSchemaCard";

export function Main() {
  const [dummyData, setDummyData] = useState<DummyData | null>(null);
  const [upToDate, setUpToDate] = useState<boolean>(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schemas: [
        {
          entity: "",
          fields: [{ key: "", value: "", type: "" }],
          numberOfRecords: 1 as unknown as number,
        },
      ],
    },
  });

  const subscribe = form.subscribe;

  useEffect(() => {
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: () => {
        setUpToDate(false);
      },
    });

    return () => callback();
  }, [subscribe]);

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
    setUpToDate(true);
  }

  return (
    <div className="flex w-screen">
      <ResizablePanelGroup direction="horizontal" className="horizontal p-2">
        <ResizablePanel defaultSize={60}>
          <div className="h-full overflow-y-auto">
            <GeneratedDataCard dummyData={dummyData} upToDate={upToDate} />
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-dark" />
        <ResizablePanel defaultSize={40}>
          <div className="h-full overflow-y-auto">
            <SetUpSchemaCard
              schemas={schemas}
              appendSchema={appendSchema}
              removeSchema={removeSchema}
              form={form}
              onSubmit={onSubmit}
              setDummyData={setDummyData}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
