import { Form, Input } from "antd";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

export function NumberInput({
  field,
  fieldState,
  label,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  label?: string;
}) {
  return (
    <Form.Item
      layout="vertical"
      validateStatus={fieldState.invalid ? "error" : undefined}
      label={label ? label : undefined}
      help={fieldState.invalid ? fieldState.error?.message : undefined}
    >
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        autoComplete="off"
        type="number"
        min={1}
        max={1000}
        value={
          Number.isNaN(Number(field.value))
            ? 1
            : Number(field.value) > 1000
              ? 1000
              : Number(field.value)
        }
        onChange={(e) => {
          const value = !e.target.value
            ? 1
            : Number(e.target.value) > 1000
              ? 1000
              : Number(e.target.value);

          field.onChange(value);
        }}
        aria-label={label}
        style={{ width: 240 }}
      />
    </Form.Item>
  );
}
