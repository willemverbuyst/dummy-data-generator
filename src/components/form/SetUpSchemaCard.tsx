import { generateDummyData } from "@/business/generators/generateDummyData";
import { useDummyData } from "@/zustand/store";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type z from "zod";
import { AddEntityButton } from "./AddEntityButton";
import { FormItem } from "./FormItem";
import { defaultSchema, formSchema } from "./formSchema";
import { GenerateButton } from "./GenerateButton";
import { ResetButton } from "./ResetButton";
import { ShowExampleButton } from "./ShowExampleButton";

export function SetUpSchemaCard() {
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setIsGenerating = useDummyData((state) => state.setIsGenerating);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);

  const { subscribe, reset, handleSubmit, control, watch } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schemas: [defaultSchema],
    },
  });

  useEffect(() => {
    const callback = subscribe({
      formState: {
        touchedFields: true,
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
    control,
    name: "schemas",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setTimeout(() => {
      const dummyData = generateDummyData(data.schemas);
      setDummyData(dummyData);
      setInSyncWithForm(true);
      setIsGenerating(false);
    }, 300);
  }

  return (
    <>
      <form
        id="form-dummy-data"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full justify-between gap-4"
      >
        <div className="flex w-full flex-col gap-1">
          {schemas.map((schema, index) => (
            <FormItem
              key={schema.id}
              schemaId={schema.id}
              index={index}
              control={control}
              removeSchema={removeSchema}
              watch={watch}
            />
          ))}
        </div>

        <div className="bg-background shadow-l m-2 flex flex-col gap-2 rounded-md p-4">
          <ShowExampleButton reset={reset} />
          <AddEntityButton append={appendSchema} />
          <ResetButton reset={reset} />
          <GenerateButton />
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}
