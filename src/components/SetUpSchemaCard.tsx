import { useDummyData } from "@/zustand/store";
import {
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  type UseFormReturn,
} from "react-hook-form";
import { exampleInput } from "../business/exampleInput";
import { FormItem } from "./form/FormItem";
import type { FormSchema } from "./form/formSchema";
import { Button } from "./ui/button";

export function SetUpSchemaCard({
  schemas,
  removeSchema,
  appendSchema,
  form,
  onSubmit,
}: {
  schemas: FieldArrayWithId<FormSchema, "schemas", "id">[];
  removeSchema: UseFieldArrayRemove;
  appendSchema: UseFieldArrayAppend<FormSchema, "schemas">;
  form: UseFormReturn<FormSchema, unknown, FormSchema>;
  onSubmit: (data: FormSchema) => void;
}) {
  const clearDummyData = useDummyData((state) => state.clearDummyData);

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
          type="submit"
          onClick={() => {
            clearDummyData();
            form.setValue("schemas", exampleInput);
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
            form.reset();
            clearDummyData();
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
