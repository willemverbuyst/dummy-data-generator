import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import { FormProvider, type Resolver, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { Entity } from "./Entity";
import { type FormSchema, formSchema } from "./form/formSchema";

vi.mock("./inputs/TextInput", () => ({
  TextInput: ({
    field,
    placeholder,
    label,
  }: {
    field: { value: string; onChange: (value: string) => void };
    fieldState: unknown;
    placeholder?: string;
    label?: string;
  }) => (
    <div>
      {label && <label htmlFor="text-input">{label}</label>}
      <input
        id="text-input"
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        placeholder={placeholder}
        data-testid={
          label
            ? `text-input-${label.replaceAll(" ", "-").toLocaleLowerCase()}`
            : "text-input"
        }
      />
    </div>
  ),
}));

vi.mock("./inputs/NumberInput", () => ({
  NumberInput: ({
    field,
    label,
  }: {
    field: { value: number; onChange: (value: number) => void };
    fieldState: unknown;
    label?: string;
  }) => (
    <div>
      {label && <label htmlFor="number-input">{label}</label>}
      <input
        id="number-input"
        type="number"
        value={field.value}
        onChange={(e) => field.onChange(Number(e.target.value))}
        data-testid={
          label
            ? `number-input-${label.replaceAll(" ", "-").toLocaleLowerCase()}`
            : "number-input"
        }
      />
    </div>
  ),
}));

vi.mock("./inputs/ValueTypeSelector", () => ({
  ValueTypeSelector: ({
    field,
  }: {
    field: { value: string; onChange: (value: string) => void };
    fieldState: unknown;
  }) => (
    <select
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      data-testid="value-type-selector"
    >
      <option value="string">String</option>
      <option value="number">Number</option>
      <option value="reference">Reference</option>
      <option value="one-of">One Of</option>
      <option value="string-array">String Array</option>
      <option value="number-array">Number Array</option>
      <option value="nested">Nested</option>
    </select>
  ),
}));

vi.mock("./Fields", () => ({
  Fields: ({ index, fieldIndex }: { index: number; fieldIndex: number }) => (
    <div data-testid={`entity-${index + 1}-field-${fieldIndex + 1}`}>
      {`Field ${fieldIndex + 1}`}
    </div>
  ),
}));

function TestWrapper({
  index = 0,
  defaultValues,
}: {
  index?: number;
  defaultValues?: FormSchema;
}) {
  const removeSchema = vi.fn();
  const defaultFormValues: FormSchema = defaultValues || {
    schemas: [
      {
        entity: "User",
        numberOfRecords: 5,
        fields: [
          { key: "name", type: "string", value: 10 },
          { key: "email", type: "email" },
        ],
      },
    ],
  };

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as Resolver<FormSchema>,
    defaultValues: defaultFormValues,
  });

  return (
    <FormProvider {...methods}>
      <Entity index={index} removeSchema={removeSchema} schemasLength={1} />
    </FormProvider>
  );
}

describe("Entity", () => {
  it("should render entity card with correct label", () => {
    render(<TestWrapper />);

    expect(screen.getByText("Entity 1")).toBeInTheDocument();
  });

  it("should render entity input with correct value", () => {
    render(<TestWrapper />);

    const entityInputLabel = screen.getByLabelText("Name of entity");
    expect(entityInputLabel).toBeInTheDocument();
    const entityInput = screen.getByTestId("text-input-name-of-entity");
    expect(entityInput).toHaveValue("User");
  });

  it("should render number of records input with correct value", () => {
    render(<TestWrapper />);

    const recordsInputLabel = screen.getByLabelText("Number of records");
    expect(recordsInputLabel).toBeInTheDocument();
    const numberInput = screen.getByTestId("number-input-number-of-records");
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveValue(5);
  });

  it("should render remove entity button", () => {
    render(<TestWrapper />);

    expect(
      screen.getByRole("button", { name: "remove-entity-1" }),
    ).toBeInTheDocument();
  });

  it("should render add field button", () => {
    render(<TestWrapper />);

    expect(
      screen.getByRole("button", { name: "entity-1-add-field" }),
    ).toBeInTheDocument();
  });
});
