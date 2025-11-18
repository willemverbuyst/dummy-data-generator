import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FieldLabel } from "../ui/field";
import { AddFieldButton } from "./buttons/AddFieldButton";
import { RemoveFieldButton } from "./buttons/RemoveFieldButton";
import { TextInput } from "./inputs/TextInput";
import { ValueTypeSelector } from "./inputs/ValueTypeSelector";

export function NestedFormItem({
  index,
  fieldIndex,
}: {
  index: number;
  fieldIndex: number;
}) {
  const { control } = useFormContext();

  const {
    fields: nestedKeyValueFields,
    append: appendNestedField,
    remove: removeNestedField,
  } = useFieldArray({
    control,
    name: `schemas.${index}.fields.${fieldIndex}.value`,
  });

  return (
    <div className="shadow-l m-4 flex flex-col gap-2 rounded-md border-2 p-2">
      <div className="flex w-full items-end justify-between">
        <FieldLabel>Nested Fields</FieldLabel>
        <AddFieldButton append={appendNestedField} />
      </div>
      {nestedKeyValueFields.map((field, nestedFieldIndex) => (
        <div key={field.id} className="flex w-full items-end gap-2">
          <Controller
            name={`schemas.${index}.fields.${fieldIndex}.value.${nestedFieldIndex}.key`}
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
            name={`schemas.${index}.fields.${fieldIndex}.value.${nestedFieldIndex}.type`}
            control={control}
            render={({ field, fieldState }) => (
              <ValueTypeSelector
                field={field}
                fieldState={fieldState}
                includeComplex={false}
              />
            )}
          />

          <RemoveFieldButton
            remove={removeNestedField}
            index={nestedFieldIndex}
            disabled={false}
          />
        </div>
      ))}
    </div>
  );
}
