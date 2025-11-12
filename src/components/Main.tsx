import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useDummyData } from "@/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { generateDummyData } from "../business/generators/generateDummyData";
import { formSchema } from "./form/formSchema";
import { GeneratedDataCard } from "./GeneratedDataCard";
import { SetUpSchemaCard } from "./SetUpSchemaCard";

export function Main() {
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);

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
        setInSyncWithForm(false);
      },
    });

    return () => callback();
  }, [subscribe, setInSyncWithForm]);

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
    setInSyncWithForm(true);
  }

  return (
    <div className="flex w-screen">
      <ResizablePanelGroup direction="horizontal" className="horizontal p-2">
        <ResizablePanel defaultSize={60}>
          <div className="h-full overflow-y-auto">
            <GeneratedDataCard />
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
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
