import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { generateDummyData } from "./business/generators/generateDummyData";
import type { DummyData } from "./business/types";
import { formSchema } from "./formSchema";
import { GeneratedDataCard } from "./GeneratedDataCard";
import { SetUpSchemaCard } from "./SetUpSchemaCard";

function App() {
  const [dummyData, setDummyData] = useState<DummyData | null>(null);
  const [upToDate, setUpToDate] = useState<boolean>(true);

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

  <ResizablePanelGroup
    direction="vertical"
    className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
  >
    <ResizablePanel defaultSize={25}>
      <div className="flex h-full items-center justify-center p-6">
        <span className="font-semibold">Header</span>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={75}>
      <div className="flex h-full items-center justify-center p-6">
        <span className="font-semibold">Content</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>;

  return (
    <div className="bg-background flex h-screen w-screen flex-col items-center gap-2 p-4">
      <h1 className="text-primary mb-2 text-center text-4xl font-bold">
        Dummy Data Generator
      </h1>
      <div className="flex h-[90vh] w-screen gap-4 px-4">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border"
        >
          <ResizablePanel defaultSize={60}>
            <div className="bg-secondary h-full overflow-y-auto">
              <GeneratedDataCard dummyData={dummyData} upToDate={upToDate} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40}>
            <div className="h-full overflow-y-auto p-2">
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
    </div>
  );
}

export default App;
