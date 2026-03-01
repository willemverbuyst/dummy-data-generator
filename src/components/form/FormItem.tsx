import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form } from "antd";
import {
  Controller,
  useFieldArray,
  useFormContext,
  type UseFieldArrayRemove,
} from "react-hook-form";
import { RemoveEntityButton } from "./buttons/RemoveEntityButton";
import { defaultField } from "./formSchema";
import { NumberInput } from "./inputs/NumberInput";
import { TextInput } from "./inputs/TextInput";
import { KeyValueFields } from "./KeyValueFields";

export function FormItem({
  index,
  schemaId,
  removeSchema,
  schemasLength,
}: {
  index: number;
  schemaId: string;
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
      key={schemaId}
      title={`Entity ${index + 1}`}
      extra={
        <RemoveEntityButton
          remove={removeSchema}
          index={index}
          disabled={schemasLength === 1}
          title={`remove-entity-${index + 1}`}
        />
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
          field={field}
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
