import { fieldValueTypeComplex, fieldValueTypeSimple } from "@/types";
import { Select } from "antd";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

export function ValueTypeSelector({
  field,
  label,
  includeComplex = true,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  label?: string;
  includeComplex?: boolean;
}) {
  const options = includeComplex
    ? [...fieldValueTypeSimple, ...fieldValueTypeComplex]
    : fieldValueTypeSimple;

  return (
    // <Form.Item label={label ? label : undefined}>
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
    // </Form.Item>
  );
}
