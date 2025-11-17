import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
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
      <div className="flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1">
        <Input
          {...field}
          value={
            isNaN(Number(field.value))
              ? 1
              : Number(field.value) > 1000
                ? 1000
                : Number(field.value)
          }
          onChange={(e) => {
            const value = isNaN(Number(e.target.value))
              ? 1
              : Number(e.target.value) > 1000
                ? 1000
                : Number(e.target.value);

            field.onChange(value);
          }}
          id={field.name}
          aria-invalid={fieldState.invalid}
          autoComplete="off"
          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive !w-14 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 font-mono text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            field.onChange(Number(field.value) === 1 ? 1 : field.value - 1)
          }
          className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          -
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            field.onChange(
              Number(field.value) === 1000 ? 1000 : field.value + 1,
            );
          }}
          className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          +
        </Button>
      </div>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
