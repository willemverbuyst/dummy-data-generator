import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Controller,
  useFieldArray,
  type FieldArrayWithId,
  type UseFieldArrayRemove,
  type UseFormReturn,
} from "react-hook-form";
import { Button } from "./components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./components/ui/field";
import { Input } from "./components/ui/input";
import type { FormSchema } from "./SetUpSchemaCard";

export function FormItem({
  form,
  index,
  schema,

  removeSchema,
}: {
  form: UseFormReturn<FormSchema, unknown, FormSchema>;
  index: number;
  schema: FieldArrayWithId<FormSchema, "schemas", "id">;
  removeSchema: UseFieldArrayRemove;
}) {
  const {
    fields: keyValueFields,
    append: appendKeyValue,
    remove: removeKeyValue,
  } = useFieldArray({
    control: form.control,
    name: `schemas.${index}.fields`,
  });
  return (
    <FieldGroup
      key={schema.id}
      className="border-primary mb-2 rounded-md border-2 p-4"
    >
      <Controller
        name={`schemas.${index}.entity`}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-dummy-data-entity">
              {`Entity ${index + 1}`}
            </FieldLabel>
            <Input
              {...field}
              id="form-dummy-data-entity"
              aria-invalid={fieldState.invalid}
              placeholder="Enter entity name"
              autoComplete="off"
            />
            <FieldDescription>
              Entity name should be singular and starting with a capital letter,
              eg. "User".
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex gap-2">
        <FieldLabel>Key</FieldLabel>
        <FieldLabel>Value</FieldLabel>
      </div>

      {keyValueFields.map((field, index2) => (
        <div key={field.id} className="flex gap-2">
          <div className="flex w-10/12 gap-2">
            <Controller
              name={`schemas.${index}.fields.${index2}.key`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id={`form-dummy-data-field-key-${index2}`}
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
              name={`schemas.${index}.fields.${index2}.value`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a value type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Simple type</SelectLabel>
                        <SelectItem value="word">Word</SelectItem>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="age">Age</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Complex type</SelectLabel>
                        <SelectItem value="reference">Reference</SelectItem>
                        <SelectItem value="one-of">One of</SelectItem>
                        <SelectItem value="string-with-words">
                          Number of words
                        </SelectItem>
                        <SelectItem value="string-array">
                          Array of strings
                        </SelectItem>
                        <SelectItem value="number-array">
                          Array of numbers
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => removeKeyValue(index2)}
          >
            -
          </Button>
          {keyValueFields.length === index2 + 1 && (
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => appendKeyValue({ key: "name", value: "name" })}
            >
              +
            </Button>
          )}
        </div>
      ))}

      <Controller
        name={`schemas.${index}.amount`}
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
              value={typeof field.value === "number" ? field.value : 1}
              onChange={(e) => field.onChange(Number(e.target.value))}
              id="form-dummy-data-amount"
              aria-invalid={fieldState.invalid}
              autoComplete="off"
            />
            <FieldDescription>
              Number of records to generate for this entity.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        variant="secondary"
        size="sm"
        type="button"
        onClick={() => removeSchema(index)}
      >
        Remove Entity
      </Button>
    </FieldGroup>
  );
}
