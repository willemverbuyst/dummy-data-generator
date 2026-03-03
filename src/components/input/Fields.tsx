import { MinusOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import {
  Controller,
  useFormContext,
  useWatch,
  type UseFieldArrayRemove,
} from "react-hook-form";
import { NumberInput } from "./inputs/NumberInput";
import { TextInput } from "./inputs/TextInput";
import { ValueTypeSelector } from "./inputs/ValueTypeSelector";
import { NestedFields } from "./NestedFields";

export function Fields({
  index,
  fieldIndex,
  fieldsLength,
  removeField,
}: {
  index: number;
  fieldIndex: number;
  fieldsLength: number;
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
    <Form.Item label={`Field ${fieldIndex + 1}`}>
      <Space.Compact block>
        <Controller
          name={`schemas.${index}.fields.${fieldIndex}.key`}
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              field={field}
              fieldState={fieldState}
              placeholder="e.g. name"
              noStyle
            />
          )}
        />
        <Controller
          name={`schemas.${index}.fields.${fieldIndex}.type`}
          control={control}
          render={({ field }) => <ValueTypeSelector field={field} noStyle />}
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
                noStyle
              />
            )}
          />
        )}
        {renderNumberInput && (
          <Controller
            name={`schemas.${index}.fields.${fieldIndex}.value`}
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput field={field} fieldState={fieldState} noStyle />
            )}
          />
        )}

        <Button
          htmlType="button"
          disabled={fieldsLength === 1}
          aria-label={`entity-${index + 1}-remove-field-${fieldIndex + 1}`}
          onClick={() => removeField(fieldIndex)}
          title="Remove field"
        >
          <MinusOutlined />
        </Button>
      </Space.Compact>

      {renderNestedForm && (
        <NestedFields index={index} fieldIndex={fieldIndex} />
      )}
    </Form.Item>
  );
}
