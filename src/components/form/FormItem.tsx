import {
  Controller,
  useFieldArray,
  useFormContext,
  type UseFieldArrayRemove,
} from "react-hook-form";
import { FieldGroup, FieldLabel } from "../ui/field";
import { AddFieldButton } from "./buttons/AddFieldButton";
import { RemoveEntityButton } from "./buttons/RemoveEntityButton";
import { RemoveFieldButton } from "./buttons/RemoveFieldButton";
import { NumberInput } from "./inputs/NumberInput";
import { TextInput } from "./inputs/TextInput";
import { ValueTypeSelector } from "./inputs/ValueTypeSelector";
import { NestedFormItem } from "./NestedFormItem";

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
            <TextInput
              field={field}
              fieldState={fieldState}
              placeholder="Enter entity name"
              label={`Entity ${index + 1}`}
            />
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
          <div key={field.id}>
            <div className="flex w-full items-end gap-2">
              <Controller
                name={`schemas.${index}.fields.${fieldIndex}.key`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextInput
                    field={field}
                    fieldState={fieldState}
                    placeholder="e.g. name"
                  />
                )}
              />
              <Controller
                name={`schemas.${index}.fields.${fieldIndex}.type`}
                control={control}
                render={({ field, fieldState }) => (
                  <ValueTypeSelector field={field} fieldState={fieldState} />
                )}
              />
              {["reference", "one-of"].includes(
                watch(`schemas.${index}.fields.${fieldIndex}.type`),
              ) && (
                <Controller
                  name={`schemas.${index}.fields.${fieldIndex}.value`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextInput
                      field={field}
                      fieldState={fieldState}
                      placeholder="e.g. User"
                    />
                  )}
                />
              )}
              {["string-array", "number-array", "string"].includes(
                watch(`schemas.${index}.fields.${fieldIndex}.type`),
              ) && (
                <Controller
                  name={`schemas.${index}.fields.${fieldIndex}.value`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <NumberInput field={field} fieldState={fieldState} />
                  )}
                />
              )}

              <RemoveFieldButton
                remove={removeField}
                index={fieldIndex}
                disabled={keyValueFields.length === 1}
              />
            </div>

            {["nested"].includes(
              watch(`schemas.${index}.fields.${fieldIndex}.type`),
            ) && <NestedFormItem index={index} fieldIndex={fieldIndex} />}
          </div>
        ))}
      </div>
    </FieldGroup>
  );
}
