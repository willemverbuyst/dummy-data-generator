import { Input } from "antd";
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
  hideLabel = false,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  label: string;
  placeholder?: string;
  hideLabel?: boolean;
}) {
  return (
    // <Form.Item
    //   validateStatus={fieldState.invalid ? "error" : undefined}
    //   label={hideLabel ? undefined : label}
    //   help={fieldState.invalid ? fieldState.error?.message : undefined}
    // >
    <Input
      {...field}
      id={field.name}
      aria-invalid={fieldState.invalid}
      placeholder={placeholder}
      autoComplete="off"
      aria-label={label}
    />
    // </Form.Item>
  );
}
