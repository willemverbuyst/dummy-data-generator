import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form } from "antd";
import {
  Controller,
  useFieldArray,
  useFormContext,
  type UseFieldArrayRemove,
} from "react-hook-form";
import { defaultField } from "./formSchema";
import { NumberInput } from "./inputs/NumberInput";
import { TextInput } from "./inputs/TextInput";
import { KeyValueFields } from "./KeyValueFields";

export function FormItem({
  index,
  removeSchema,
  schemasLength,
}: {
  index: number;
  removeSchema: UseFieldArrayRemove;
  schemasLength: number;
}) {
  const { control } = useFormContext();
  const {
    fields: keyValueFields,
    append: appendField,
    remove: removeField,
  } = useFieldArray({
    control,
    name: `schemas.${index}.fields`,
  });

  return (
    <Card
      title={`Entity ${index + 1}`}
      extra={
        <Button
          size="small"
          htmlType="button"
          aria-label={`remove-entity-${index + 1}`}
          disabled={schemasLength === 1}
          onClick={() => removeSchema(index)}
          title="Remove Entity"
        >
          <DeleteOutlined />
        </Button>
      }
      type="inner"
    >
      <Form.Item label="Name of entity">
        <Controller
          name={`schemas.${index}.entity`}
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              field={field}
              fieldState={fieldState}
              placeholder="Enter entity name"
              label="Name of entity"
            />
          )}
        />
      </Form.Item>
      <Form.Item label="Number of records">
        <Controller
          name={`schemas.${index}.numberOfRecords`}
          control={control}
          render={({ field, fieldState }) => (
            <NumberInput
              field={field}
              fieldState={fieldState}
              label="Number of records"
            />
          )}
        />
      </Form.Item>

      {keyValueFields.map((field, fieldIndex) => (
        <KeyValueFields
          key={field.id}
          index={index}
          fieldIndex={fieldIndex}
          keyValueFieldsLength={keyValueFields.length}
          removeField={removeField}
        />
      ))}

      <div style={{ width: "100%", textAlign: "center" }}>
        <Button
          key="add-field"
          variant="text"
          htmlType="button"
          onClick={() => appendField(defaultField)}
          aria-label="Append field"
        >
          <PlusOutlined onClick={() => appendField(defaultField)} />
          Add Field
        </Button>
      </div>
    </Card>
  );
}
