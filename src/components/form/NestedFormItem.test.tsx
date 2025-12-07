import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { NestedFormItem } from "./NestedFormItem";
import { formSchema, type FormSchema } from "./formSchema";

// Mock the button components
vi.mock("./buttons/AddFieldButton", () => ({
  AddFieldButton: ({ append }: { append: () => void }) => (
    <button onClick={append} data-testid="add-nested-field">
      Add Field
    </button>
  ),
}));

vi.mock("./buttons/RemoveFieldButton", () => ({
  RemoveFieldButton: ({
    remove,
    index,
  }: {
    remove: (index: number) => void;
    index: number;
    disabled: boolean;
  }) => (
    <button onClick={() => remove(index)} data-testid={`remove-field-${index}`}>
      Remove
    </button>
  ),
}));

// Mock the input components
vi.mock("./inputs/TextInput", () => ({
  TextInput: ({
    field,
    placeholder,
  }: {
    field: { value: string; onChange: (value: string) => void };
    fieldState: unknown;
    placeholder: string;
  }) => (
    <input
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      placeholder={placeholder}
      data-testid="text-input"
    />
  ),
}));

vi.mock("./inputs/ValueTypeSelector", () => ({
  ValueTypeSelector: ({
    field,
  }: {
    field: { value: string; onChange: (value: string) => void };
    fieldState: unknown;
    includeComplex: boolean;
  }) => (
    <select
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      data-testid="value-type-selector"
    >
      <option value="string">String</option>
      <option value="number">Number</option>
      <option value="boolean">Boolean</option>
    </select>
  ),
}));

function TestWrapper({
  index,
  fieldIndex,
}: {
  index: number;
  fieldIndex: number;
}) {
  const defaultValues: FormSchema = {
    schemas: [
      {
        entity: "User",
        numberOfRecords: 5,
        fields: [
          {
            key: "address",
            type: "nested",
            value: [
              { key: "street", type: "string" },
              { key: "city", type: "string" },
            ],
          },
        ],
      },
    ],
  };

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as Resolver<FormSchema>,
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <NestedFormItem index={index} fieldIndex={fieldIndex} />
    </FormProvider>
  );
}

describe("NestedFormItem", () => {
  it("should render nested fields label", () => {
    render(<TestWrapper index={0} fieldIndex={0} />);

    expect(screen.getByText("Nested Fields")).toBeInTheDocument();
  });

  it("should render add field button", () => {
    render(<TestWrapper index={0} fieldIndex={0} />);

    expect(screen.getByTestId("add-nested-field")).toBeInTheDocument();
  });

  it("should render existing nested fields", () => {
    render(<TestWrapper index={0} fieldIndex={0} />);

    const textInputs = screen.getAllByTestId("text-input");
    const selectors = screen.getAllByTestId("value-type-selector");

    // Should have 2 nested fields (street and city)
    expect(textInputs).toHaveLength(2);
    expect(selectors).toHaveLength(2);
  });

  it("should render nested field with correct values", () => {
    render(<TestWrapper index={0} fieldIndex={0} />);

    const textInputs = screen.getAllByTestId("text-input");

    expect(textInputs[0]).toHaveValue("street");
    expect(textInputs[1]).toHaveValue("city");
  });

  it("should render remove button for each nested field", () => {
    render(<TestWrapper index={0} fieldIndex={0} />);

    expect(screen.getByTestId("remove-field-0")).toBeInTheDocument();
    expect(screen.getByTestId("remove-field-1")).toBeInTheDocument();
  });

  it("should add a new nested field when add button is clicked", async () => {
    render(<TestWrapper index={0} fieldIndex={0} />);
    const user = userEvent.setup();

    const addButton = screen.getByTestId("add-nested-field");
    await user.click(addButton);

    // Should now have 3 fields
    const textInputs = screen.getAllByTestId("text-input");
    expect(textInputs).toHaveLength(3);
  });

  it("should remove a nested field when remove button is clicked", async () => {
    render(<TestWrapper index={0} fieldIndex={0} />);
    const user = userEvent.setup();

    const removeButton = screen.getByTestId("remove-field-0");
    await user.click(removeButton);

    // Should now have 1 field (city remains)
    const textInputs = screen.getAllByTestId("text-input");
    expect(textInputs).toHaveLength(1);
    expect(textInputs[0]).toHaveValue("city");
  });

  it("should update nested field key when typing", async () => {
    render(<TestWrapper index={0} fieldIndex={0} />);
    const user = userEvent.setup();

    const textInputs = screen.getAllByTestId("text-input");
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], "zipcode");

    expect(textInputs[0]).toHaveValue("zipcode");
  });

  it("should update nested field type when selecting", async () => {
    render(<TestWrapper index={0} fieldIndex={0} />);
    const user = userEvent.setup();

    const selectors = screen.getAllByTestId("value-type-selector");
    await user.selectOptions(selectors[0], "number");

    expect(selectors[0]).toHaveValue("number");
  });

  it("should pass includeComplex=false to ValueTypeSelector", () => {
    render(<TestWrapper index={0} fieldIndex={0} />);

    // If includeComplex was true, we'd see "object" and "array" options
    // Since it's false, we should only see simple types
    const selectors = screen.getAllByTestId("value-type-selector");
    const options = within(selectors[0]).getAllByRole("option");

    // Our mock only includes simple types
    expect(options).toHaveLength(3);
    expect(options.map((opt) => opt.textContent)).toEqual([
      "String",
      "Number",
      "Boolean",
    ]);
  });

  it("should render correct placeholder for text input", () => {
    render(<TestWrapper index={0} fieldIndex={0} />);

    const textInputs = screen.getAllByTestId("text-input");
    expect(textInputs[0]).toHaveAttribute("placeholder", "e.g. name");
  });
});
