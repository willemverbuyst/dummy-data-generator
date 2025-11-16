import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
    <Field data-invalid={fieldState.invalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Input
        {...field}
        type="number"
        min={1}
        max={1000}
        value={typeof field.value === "number" ? field.value : 1}
        onChange={(e) => field.onChange(Number(e.target.value))}
        id={field.name}
        aria-invalid={fieldState.invalid}
        autoComplete="off"
      />

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
