import { Field, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fieldValueTypeComplex, fieldValueTypeSimple } from "@/types";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

export function ValueTypeSelector({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <Select
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a value type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Simple type</SelectLabel>
            {fieldValueTypeSimple.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Complex type</SelectLabel>
            {fieldValueTypeComplex.map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace("-", " ")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
