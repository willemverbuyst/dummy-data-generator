import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
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
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} className={clsx(hideLabel && "hidden")}>
        {label}
      </FieldLabel>
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
