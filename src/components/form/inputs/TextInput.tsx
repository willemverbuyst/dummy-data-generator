import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
  label?: string;
  placeholder?: string;
}) {
  return (
    <Field data-invalid={fieldState.invalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder={placeholder}
        autoComplete="off"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
