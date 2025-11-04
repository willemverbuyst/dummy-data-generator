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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./components/ui/field";
import { Input } from "./components/ui/input";
import type { FormSchema } from "./formSchema";

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
      <div className="flex items-end gap-2">
        <div className="flex w-10/12 gap-2">
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
                {/* <FieldDescription>
                Entity name should be singular and starting with a capital
                letter, eg. "User".
              </FieldDescription> */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
          onClick={() => removeSchema(index)}
        >
          -
        </Button>
      </div>

      <div className="flex gap-2">
        <FieldLabel>Fields</FieldLabel>
      </div>

      {keyValueFields.map((field, index2) => (
        <div key={field.id} className="flex items-end gap-2">
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
              name={`schemas.${index}.fields.${index2}.type`}
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
                        <SelectItem value="word">word</SelectItem>
                        <SelectItem value="string">string</SelectItem>
                        <SelectItem value="number">number</SelectItem>
                        <SelectItem value="boolean">boolean</SelectItem>
                        <SelectItem value="email">email</SelectItem>
                        <SelectItem value="name">name</SelectItem>
                        <SelectItem value="age">age</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Complex type</SelectLabel>
                        <SelectItem value="reference">reference</SelectItem>
                        <SelectItem value="one-of">one of</SelectItem>
                        <SelectItem value="long-string">long string</SelectItem>
                        <SelectItem value="string-array">
                          string array
                        </SelectItem>
                        <SelectItem value="number-array">
                          number array
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
            {form.watch(`schemas.${index}.fields.${index2}.type`) ===
              "reference" && (
              <Controller
                name={`schemas.${index}.fields.${index2}.value`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={`form-dummy-data-field-value-${index2}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. User"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
            {["string-array", "number-array", "long-string"].includes(
              form.watch(`schemas.${index}.fields.${index2}.type`),
            ) && (
              <Controller
                name={`schemas.${index}.fields.${index2}.value`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={`form-dummy-data-field-value-${index2}`}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type="number"
                      min={1}
                      max={1000}
                      value={typeof field.value === "number" ? field.value : 1}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </div>

          <Button
            variant="secondary"
            size="sm"
            type="button"
            disabled={keyValueFields.length === 1}
            onClick={() => removeKeyValue(index2)}
          >
            -
          </Button>
          {keyValueFields.length === index2 + 1 && (
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => appendKeyValue({ key: "", value: "", type: "" })}
            >
              +
            </Button>
          )}
        </div>
      ))}
    </FieldGroup>
  );
}
