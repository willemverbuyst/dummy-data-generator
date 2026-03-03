import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { defaultField } from "./form/formSchema";
import { TextInput } from "./inputs/TextInput";
import { ValueTypeSelector } from "./inputs/ValueTypeSelector";

export function NestedFields({
  index,
  fieldIndex,
}: {
  index: number;
  fieldIndex: number;
}) {
  const { control } = useFormContext();

  const {
    fields: nestedFields,
    append: appendNestedField,
    remove: removeNestedField,
  } = useFieldArray({
    control,
    name: `schemas.${index}.fields.${fieldIndex}.value`,
  });

  return (
    <Form.Item style={{ marginTop: "16px", marginBottom: "0px" }}>
      {nestedFields.map((field, nestedFieldIndex) => (
        <Form.Item
          key={field.id}
          label={`Nested field ${nestedFieldIndex + 1}`}
        >
          <Space.Compact block>
            <Controller
              name={`schemas.${index}.fields.${fieldIndex}.value.${nestedFieldIndex}.key`}
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
              name={`schemas.${index}.fields.${fieldIndex}.value.${nestedFieldIndex}.type`}
              control={control}
              render={({ field }) => (
                <ValueTypeSelector
                  field={field}
                  includeComplex={false}
                  noStyle
                />
              )}
            />

            <Button
              htmlType="button"
              aria-label={`entity-${index + 1}-field-${fieldIndex + 1}-remove-nested-field`}
              onClick={() => removeNestedField(nestedFieldIndex)}
              title="Remove nested field"
            >
              <MinusOutlined />
            </Button>
          </Space.Compact>
        </Form.Item>
      ))}

      <Button
        block
        variant="dashed"
        htmlType="button"
        onClick={() => appendNestedField(defaultField)}
        aria-label={`entity-${index + 1}-field-${fieldIndex + 1}-append-nested-field`}
      >
        <PlusOutlined />
        Add Nested Field
      </Button>
    </Form.Item>
  );
}
