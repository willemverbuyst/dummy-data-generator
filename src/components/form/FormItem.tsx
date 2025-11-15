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
  useFormContext,
  type UseFieldArrayRemove,
} from "react-hook-form";
import {
  fieldValueTypeComplex,
  fieldValueTypeSimple,
} from "../../business/types";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { AddFieldButton } from "./buttons/AddFieldButton";
import { RemoveEntityButton } from "./buttons/RemoveEntityButton";
import { RemoveFieldButton } from "./buttons/RemoveFieldButton";
import { NumberInput } from "./inputs/NumberInput";

export function FormItem({
  index,
  schemaId,
  removeSchema,
}: {
  index: number;
  schemaId: string;
  removeSchema: UseFieldArrayRemove;
}) {
  const { watch, control } = useFormContext();
  const {
    fields: keyValueFields,
    append: appendField,
    remove: removeField,
  } = useFieldArray({
    control,
    name: `schemas.${index}.fields`,
  });
  return (
    <FieldGroup
      key={schemaId}
      className="bg-background shadow-l m-2 rounded-md p-4"
    >
      <div className="flex w-full items-end gap-2">
        <Controller
          name={`schemas.${index}.entity`}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-dummy-data-entity">
                {`Entity ${index + 1}`}{" "}
              </FieldLabel>
              <Input
                {...field}
                id="form-dummy-data-entity"
                aria-invalid={fieldState.invalid}
                placeholder="Enter entity name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name={`schemas.${index}.numberOfRecords`}
          control={control}
          render={({ field, fieldState }) => (
            <NumberInput
              field={field}
              fieldState={fieldState}
              label="Number of Records"
            />
          )}
        />
        <RemoveEntityButton remove={removeSchema} index={index} />
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-end justify-between">
          <FieldLabel>Fields</FieldLabel>
          <AddFieldButton append={appendField} />
        </div>
        {keyValueFields.map((field, fieldIndex) => (
          <div key={field.id} className="flex w-full items-end gap-2">
            <Controller
              name={`schemas.${index}.fields.${fieldIndex}.key`}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id={`form-dummy-data-field-key-${fieldIndex}`}
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
              name={`schemas.${index}.fields.${fieldIndex}.type`}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
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
                        {fieldValueTypeSimple.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Complex type</SelectLabel>
                        {fieldValueTypeComplex.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace("-", " ")}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {["reference", "one-of"].includes(
              watch(`schemas.${index}.fields.${fieldIndex}.type`),
            ) && (
              <Controller
                name={`schemas.${index}.fields.${fieldIndex}.value`}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={`form-dummy-data-field-value-${fieldIndex}`}
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
              watch(`schemas.${index}.fields.${fieldIndex}.type`),
            ) && (
              <Controller
                name={`schemas.${index}.fields.${fieldIndex}.value`}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={`form-dummy-data-field-value-${fieldIndex}`}
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

            <RemoveFieldButton
              remove={removeField}
              index={fieldIndex}
              disabled={keyValueFields.length === 1}
            />
          </div>
        ))}
      </div>
    </FieldGroup>
  );
}
