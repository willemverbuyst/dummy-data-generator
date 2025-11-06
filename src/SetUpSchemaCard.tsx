import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import { exampleInput } from "./business/exampleInput";
import { Button } from "./components/ui/button";
import { FormItem } from "./FormItem";
import type { FormSchema } from "./formSchema";

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
  function generateExample() {
    form.setValue("schemas", exampleInput);

    onSubmit({ schemas: form.watch("schemas") });
  }

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
        <Button variant="outline" type="button" onClick={generateExample}>
          Example
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            appendSchema({
              entity: "",
              fields: [{ key: "", value: "", type: "" }],
              amount: 1,
            })
          }
        >
          Add Entity
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => form.reset()}
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
