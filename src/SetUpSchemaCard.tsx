import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import { exampleInput } from "./business/exampleInput";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
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
  return (
    <Card className="w-[600px] overflow-y-auto">
      <CardHeader>
        <CardTitle>Set up Schema</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-dummy-data" onSubmit={form.handleSubmit(onSubmit)}>
          {schemas.map((schema, index) => (
            <FormItem
              key={schema.id}
              schema={schema}
              index={index}
              form={form}
              removeSchema={removeSchema}
            />
          ))}

          <div className="flex justify-between">
            <div>
              <Button
                variant="outline"
                type="button"
                onClick={() => form.setValue("schemas", exampleInput)}
              >
                Example
              </Button>
            </div>
            <div className="flex gap-2">
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
