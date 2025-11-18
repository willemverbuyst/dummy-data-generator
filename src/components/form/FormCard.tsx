import { useDummyData } from "@/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { Resolver } from "react-hook-form";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { AddEntityButton } from "./buttons/AddEntityButton";
import { GenerateButton } from "./buttons/GenerateButton";
import { ResetButton } from "./buttons/ResetButton";
import { ShowExampleButton } from "./buttons/ShowExampleButton";
import { FormItem } from "./FormItem";
import { defaultSchema, formSchema, type FormSchema } from "./formSchema";

export function FormCard() {
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setIsGenerating = useDummyData((state) => state.setIsGenerating);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as Resolver<FormSchema>,
    defaultValues: {
      schemas: [defaultSchema],
    },
  });

  const { subscribe, handleSubmit, control } = methods;

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
    remove: removeSchema,
    append: appendSchema,
  } = useFieldArray({
    control,
    name: "schemas",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsGenerating(true);

    // Dynamic import - only load the generator (and faker) when needed
    const { generateDummyData } = await import(
      "@/lib/generators/generateDummyData"
    );

    setTimeout(() => {
      const dummyData = generateDummyData(data.schemas);
      setDummyData(dummyData);
      setInSyncWithForm(true);
      setIsGenerating(false);
    }, 300);
  }

  return (
    <FormProvider {...methods}>
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
              removeSchema={removeSchema}
            />
          ))}
        </div>

        <div className="bg-background shadow-l m-2 flex flex-col gap-2 rounded-md p-4">
          <ShowExampleButton />
          <AddEntityButton append={appendSchema} />
          <ResetButton />
          <GenerateButton />
        </div>
      </form>
    </FormProvider>
  );
}
