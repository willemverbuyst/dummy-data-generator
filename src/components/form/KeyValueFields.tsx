import {
  Controller,
  useFormContext,
  useWatch,
  type UseFieldArrayRemove,
} from "react-hook-form";
import { RemoveFieldButton } from "./buttons/RemoveFieldButton";
import { NumberInput } from "./inputs/NumberInput";
import { TextInput } from "./inputs/TextInput";
import { ValueTypeSelector } from "./inputs/ValueTypeSelector";
import { NestedFormItem } from "./NestedFormItem";

export function KeyValueFields({
  index,
  fieldIndex,
  field,
  keyValueFieldsLength,
  removeField,
}: {
  index: number;
  fieldIndex: number;
  field: Record<"id", string>;
  keyValueFieldsLength: number;
  removeField: UseFieldArrayRemove;
}) {
  const { control } = useFormContext();
  const type = useWatch({
    name: `schemas.${index}.fields.${fieldIndex}.type`,
  });
  const renderTextInput = ["reference", "one-of"].includes(type);
  const renderNumberInput = ["string-array", "number-array", "string"].includes(
    type,
  );
  const renderNestedForm = ["nested"].includes(type);

  return (
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
              label={`entity ${index + 1} key ${fieldIndex + 1}`}
              hideLabel
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
        {renderTextInput && (
          <Controller
            name={`schemas.${index}.fields.${fieldIndex}.value`}
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                field={field}
                fieldState={fieldState}
                placeholder="e.g. User"
                label={`entity ${index + 1} key ${fieldIndex + 1} value`}
                hideLabel
              />
            )}
          />
        )}
        {renderNumberInput && (
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
          disabled={keyValueFieldsLength === 1}
          title={`entity-${index + 1}-remove-field`}
        />
      </div>

      {renderNestedForm && (
        <NestedFormItem index={index} fieldIndex={fieldIndex} />
      )}
    </div>
  );
}
