import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import {
  Controller,
  useFieldArray,
  useFormContext,
  type UseFieldArrayRemove,
} from "react-hook-form";
import { Fields } from "./Fields";
import { defaultField } from "./form/formSchema";
import { NumberInput } from "./inputs/NumberInput";
import { TextInput } from "./inputs/TextInput";

export function Entity({
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
    fields,
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
          title="Remove entity"
        >
          <DeleteOutlined />
        </Button>
      }
      type="inner"
    >
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

      {fields.map((field, fieldIndex) => (
        <Fields
          key={field.id}
          index={index}
          fieldIndex={fieldIndex}
          fieldsLength={fields.length}
          removeField={removeField}
        />
      ))}

      <div style={{ width: "100%", textAlign: "center" }}>
        <Button
          key="add-field"
          variant="text"
          htmlType="button"
          aria-label={`entity-${index + 1}-add-field`}
          onClick={() => appendField(defaultField)}
        >
          <PlusOutlined onClick={() => appendField(defaultField)} />
          Add Field
        </Button>
      </div>
    </Card>
  );
}
