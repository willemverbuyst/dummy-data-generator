import { fieldValueTypeComplex, fieldValueTypeSimple } from "@/types";
import { Form, Select } from "antd";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

export function ValueTypeSelector({
  field,
  includeComplex = true,
  noStyle = false,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  nameOfFormItem?: string | string[];
  includeComplex?: boolean;
  noStyle?: boolean;
}) {
  const options = includeComplex
    ? [...fieldValueTypeSimple, ...fieldValueTypeComplex]
    : fieldValueTypeSimple;

  return (
    <Form.Item noStyle={noStyle}>
      <Select
        id={field.name}
        listHeight={options.length * 32}
        aria-label={field.name}
        value={field.value}
        onChange={field.onChange}
        options={options.map((type) => ({
          label: type.replace("-", " "),
          value: type,
        }))}
        showSearch={{
          filterOption: (input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
        }}
      />
    </Form.Item>
  );
}
