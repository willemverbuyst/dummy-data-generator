import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { dummyDataSchemas } from "./business/exampleInput";
import { generateDummyData } from "./business/generators/generateDummyData";
import type { DummyData, FieldValueType } from "./business/types";
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

const formSchema = z.object({
  schemas: z.array(
    z.object({
      entity: z
        .string()
        .min(1, "Entity is required")
        .regex(
          /^[A-Z][a-z]*$/,
          "Must start with a capital letter and have lowercase letters only",
        ),
      fields: z
        .array(
          z.object({
            key: z.string().min(1, "Key is required"),
            value: z.string().min(1, "Value is required"),
          }),
        )
        .nonempty("At least one field is required"),
      amount: z.number().min(1, "Amount must be at least 1"),
    }),
  ),
});

export type FormSchema = z.infer<typeof formSchema>;

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
          fields: [{ key: "name", value: "name" }],
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
    const schemas = data.schemas.map((schema) => {
      console.log({ schema });
      const fieldsAsObject = schema.fields.reduce(
        (a, b) => {
          a.push([b.key, b.value as FieldValueType]);
          return a;
        },
        [] as [string, FieldValueType][],
      );

      return {
        entity: schema.entity,
        fields: fieldsAsObject,
        amount: schema.amount,
      };
    });
    console.log({ schemas });
    const dummyData = generateDummyData(schemas);
    setDummyData(dummyData);
  }

  function handleReset() {
    form.reset();
    setDummyData(undefined);
  }

  function generateExample() {
    form.reset();
    const dummyData = generateDummyData(dummyDataSchemas);
    setDummyData(dummyData);
  }

  return (
    <Card className="w-[400px]">
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
                  fields: [{ key: "name", value: "name" }],
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
        <Field orientation="horizontal">
          <Button variant="outline" onClick={generateExample}>
            Example
          </Button>
          <Button type="button" variant="destructive" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" form="form-dummy-data">
            Generate
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
