import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./components/ui/field";
import { Input } from "./components/ui/input";

const formSchema = z.object({
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
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
});

export function SetUpSchemaCard({
  setDummyData,
}: {
  setDummyData: Dispatch<SetStateAction<DummyData | undefined>>;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entity: "",
      fields: [{ key: "name", value: "name" }],
      amount: 1,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const fieldsAsObject = data.fields.reduce(
      (a, b) => {
        a.push([b.key, b.value as FieldValueType]);
        return a;
      },
      [] as [string, FieldValueType][],
    );

    const schema = { ...data, fields: fieldsAsObject };
    console.log(schema);
    const dummyData = generateDummyData([schema]);
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
          <FieldGroup>
            <Controller
              name="entity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-dummy-data-entity">
                    Entity
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-dummy-data-entity"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter entity name"
                    autoComplete="off"
                  />
                  <FieldDescription>
                    Entity name should be singular and starting with a capital
                    letter, eg. "User".
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {!!form.watch("entity") && (
              <>
                <div className="flex gap-2">
                  <FieldLabel>Key</FieldLabel>
                  <FieldLabel>Value</FieldLabel>
                </div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Controller
                      name={`fields.${index}.key`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="flex-1"
                          data-invalid={fieldState.invalid}
                        >
                          <Input
                            {...field}
                            id={`form-dummy-data-field-key-${index}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g. name"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name={`fields.${index}.value`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="flex-1"
                          data-invalid={fieldState.invalid}
                        >
                          <Input
                            {...field}
                            id={`form-dummy-data-field-value-${index}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g. string"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      -
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => append({ key: "name", value: "name" })}
                  >
                    +
                  </Button>
                </div>

                <Controller
                  name="amount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-dummy-data-amount">
                        Number of Records
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        max={1000}
                        value={
                          typeof field.value === "number" ? field.value : 1
                        }
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        id="form-dummy-data-amount"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Number of records to generate for this entity.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </>
            )}
          </FieldGroup>
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
