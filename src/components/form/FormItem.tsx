import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import {
  Controller,
  useFieldArray,
  type Control,
  type UseFieldArrayRemove,
  type UseFormWatch,
} from "react-hook-form";
import {
  fieldValueTypeComplex,
  fieldValueTypeSimple,
} from "../../business/types";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { FormSchema } from "./formSchema";

export function FormItem({
  control,
  index,
  schemaId,
  removeSchema,
  watch,
}: {
  control: Control<FormSchema, unknown, FormSchema>;
  index: number;
  schemaId: string;
  removeSchema: UseFieldArrayRemove;
  watch: UseFormWatch<FormSchema>;
}) {
  const {
    fields: keyValueFields,
    append: appendKeyValue,
    remove: removeKeyValue,
  } = useFieldArray({
    control,
    name: `schemas.${index}.fields`,
  });
  return (
    <FieldGroup
      key={schemaId}
      className="bg-background shadow-l m-2 rounded-md p-4"
    >
      <div className="flex w-full items-end gap-2">
        <Controller
          name={`schemas.${index}.entity`}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-dummy-data-entity">
                {`Entity ${index + 1}`}{" "}
              </FieldLabel>
              <Input
                {...field}
                id="form-dummy-data-entity"
                aria-invalid={fieldState.invalid}
                placeholder="Enter entity name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name={`schemas.${index}.numberOfRecords`}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-dummy-data-number-of-records">
                Number of Records
              </FieldLabel>
              <Input
                {...field}
                type="number"
                min={1}
                max={1000}
                value={typeof field.value === "number" ? field.value : 1}
                onChange={(e) => field.onChange(Number(e.target.value))}
                id="form-dummy-data-number-of-records"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => removeSchema(index)}
            >
              <TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove entity</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-end justify-between">
          <FieldLabel>Fields</FieldLabel>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => appendKeyValue({ key: "", value: "", type: "" })}
          >
            <PlusIcon />
          </Button>
        </div>
        {keyValueFields.map((field, index2) => (
          <div key={field.id} className="flex w-full items-end gap-2">
            <Controller
              name={`schemas.${index}.fields.${index2}.key`}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id={`form-dummy-data-field-key-${index2}`}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name={`schemas.${index}.fields.${index2}.type`}
              control={control}
              render={({ field, fieldState }) => (
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {["reference", "one-of"].includes(
              watch(`schemas.${index}.fields.${index2}.type`),
            ) && (
              <Controller
                name={`schemas.${index}.fields.${index2}.value`}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={`form-dummy-data-field-value-${index2}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. User"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
            {["string-array", "number-array", "long-string"].includes(
              watch(`schemas.${index}.fields.${index2}.type`),
            ) && (
              <Controller
                name={`schemas.${index}.fields.${index2}.value`}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={`form-dummy-data-field-value-${index2}`}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type="number"
                      min={1}
                      max={1000}
                      value={typeof field.value === "number" ? field.value : 1}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}

            <Button
              variant="outline"
              size="sm"
              type="button"
              disabled={keyValueFields.length === 1}
              onClick={() => removeKeyValue(index2)}
            >
              <MinusIcon />
            </Button>
          </div>
        ))}
      </div>
    </FieldGroup>
  );
}
