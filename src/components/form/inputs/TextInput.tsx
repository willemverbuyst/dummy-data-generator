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
}: {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  label: string;
  placeholder?: string;
}) {
  return (
    <Input
      {...field}
      id={field.name}
      aria-invalid={fieldState.invalid}
      placeholder={placeholder}
      autoComplete="off"
      aria-label={label}
    />
  );
}
