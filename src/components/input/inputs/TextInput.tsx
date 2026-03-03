import { Form, Input } from "antd";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

export function TextInput({
  field,
  fieldState,
  label,
  placeholder,
  noStyle = false,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  label?: string;
  placeholder?: string;
  noStyle?: boolean;
}) {
  return (
    <Form.Item
      label={label}
      validateStatus={fieldState.invalid ? "error" : undefined}
      noStyle={noStyle}
      help={fieldState.error?.message}
    >
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder={placeholder}
        autoComplete="off"
        aria-label={label ?? field.name}
      />
    </Form.Item>
  );
}
