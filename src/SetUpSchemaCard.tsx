import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { exampleInput } from "./business/exampleInput";
import { generateDummyData } from "./business/generators/generateDummyData";
import type { DummyData } from "./business/types";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Field } from "./components/ui/field";
import { FormItem } from "./FormItem";
import { formSchema } from "./formSchema";

export function SetUpSchemaCard({
  setDummyData,
}: {
  setDummyData: Dispatch<SetStateAction<DummyData | undefined>>;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schemas: [
        {
          entity: "",
          fields: [{ key: "", value: "" }],
          amount: 1 as unknown as number,
        },
      ],
    },
  });

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
  }

  function handleReset() {
    form.reset();
    setDummyData(undefined);
  }

  function generateExample() {
    form.setValue("schemas", exampleInput);
    onSubmit({ schemas: exampleInput });
  }

  return (
    <Card className="w-[600px]">
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

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() =>
                appendSchema({
                  entity: "",
                  fields: [{ key: "", value: "" }],
                  amount: 1,
                })
              }
            >
              Add Entity
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="flex justify-between">
          <div>
            <Button variant="outline" onClick={generateExample}>
              Example
            </Button>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="destructive" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" form="form-dummy-data">
              Generate
            </Button>
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
}
