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
import { ModeToggle } from "./components/theme-provider/mode-toggle";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-dark relative flex h-full min-h-screen w-screen flex-col items-center gap-2 p-4">
        <h1 className="text-primary mb-2 text-center text-4xl font-bold">
          Dummy Data Generator
        </h1>
        <span className="absolute top-4 right-4">
          <ModeToggle />
        </span>

        <div className="flex w-screen">
          <ResizablePanelGroup
            direction="horizontal"
            className="horizontal p-2"
          >
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
      </div>
    </ThemeProvider>
  );
}

export default App;
