import { exampleInput } from "@/business/exampleInput";
import { generateDummyData } from "@/business/generators/generateDummyData";
import { useDummyData } from "@/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type z from "zod";
import { Button } from "../ui/button";
import { FormItem } from "./FormItem";
import { formSchema } from "./formSchema";

export function SetUpSchemaCard() {
  const clearDummyData = useDummyData((state) => state.clearDummyData);
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setIsGenerating = useDummyData((state) => state.setIsGenerating);
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
    control: form.control,
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
    <form
      id="form-dummy-data"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full justify-between gap-4"
    >
      <div className="flex w-full flex-col gap-1">
        {schemas.map((schema, index) => (
          <FormItem
            key={schema.id}
            schema={schema}
            index={index}
            form={form}
            removeSchema={removeSchema}
          />
        ))}
      </div>

      <div className="bg-background shadow-l m-2 flex flex-col gap-2 rounded-md p-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            setIsGenerating(true);
            setTimeout(() => {
              const dummyData = generateDummyData(exampleInput);
              setDummyData(dummyData);
              form.reset({ schemas: exampleInput });
              setInSyncWithForm(true);
              setIsGenerating(false);
            }, 300);
          }}
        >
          Example
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            appendSchema({
              entity: "",
              fields: [{ key: "", value: "", type: "" }],
              numberOfRecords: 1,
            })
          }
        >
          Add Entity
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            form.reset({
              schemas: [
                {
                  entity: "",
                  fields: [{ key: "", value: "", type: "" }],
                  numberOfRecords: 1 as unknown as number,
                },
              ],
            });
            clearDummyData();
            setInSyncWithForm(true);
          }}
        >
          Reset
        </Button>
        <Button type="submit" variant="default">
          Generate
        </Button>
      </div>
    </form>
  );
}
