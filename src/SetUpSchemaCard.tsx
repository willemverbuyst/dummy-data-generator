import {
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  type UseFormReturn,
} from "react-hook-form";
import { exampleInput } from "./business/exampleInput";
import type { DummyData } from "./business/types";
import { Button } from "./components/ui/button";
import { FormItem } from "./FormItem";
import type { FormSchema } from "./formSchema";

export function SetUpSchemaCard({
  schemas,
  removeSchema,
  appendSchema,
  form,
  onSubmit,
  setDummyData,
}: {
  schemas: FieldArrayWithId<FormSchema, "schemas", "id">[];
  removeSchema: UseFieldArrayRemove;
  appendSchema: UseFieldArrayAppend<FormSchema, "schemas">;
  form: UseFormReturn<FormSchema, unknown, FormSchema>;
  onSubmit: (data: FormSchema) => void;
  setDummyData: React.Dispatch<React.SetStateAction<DummyData | null>>;
}) {
  return (
    <form
      id="form-dummy-data"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full justify-between gap-2"
    >
      <div className="flex w-full flex-col gap-2">
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

      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          type="submit"
          onClick={() => {
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
            setDummyData(null);
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
