import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Fields } from "./Fields";

vi.mock("./inputs/TextInput", () => ({
  TextInput: ({
    field,
    placeholder,
    label,
  }: {
    field: { value: string; onChange: (value: string) => void };
    placeholder: string;
    label: string;
  }) => (
    <input
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={label}
      data-testid="text-input"
    />
  ),
}));

vi.mock("./inputs/NumberInput", () => ({
  NumberInput: ({
    field,
  }: {
    field: { value: number; onChange: (value: number) => void };
  }) => (
    <input
      type="number"
      value={field.value}
      onChange={(e) => field.onChange(Number(e.target.value))}
      data-testid="number-input"
    />
  ),
}));

vi.mock("./inputs/ValueTypeSelector", () => ({
  ValueTypeSelector: ({
    field,
  }: {
    field: { value: string; onChange: (value: string) => void };
  }) => (
    <select
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      data-testid="value-type-selector"
    >
      <option value="name">name</option>
      <option value="email">email</option>
      <option value="reference">reference</option>
      <option value="one-of">one-of</option>
      <option value="string">string</option>
      <option value="string-array">string-array</option>
      <option value="number-array">number-array</option>
      <option value="nested">nested</option>
    </select>
  ),
}));

vi.mock("./NestedFields", () => ({
  NestedFields: ({
    index,
    fieldIndex,
  }: {
    index: number;
    fieldIndex: number;
  }) => (
    <div data-testid="nested-form-item">
      Nested Form for Entity {index + 1} Field {fieldIndex + 1}
    </div>
  ),
}));

// Wrapper component to provide form context
function TestWrapper({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues?: object;
}) {
  const methods = useForm({
    defaultValues: defaultValues || {
      schemas: [
        {
          fields: [{ id: "field-1", key: "testKey", type: "name", value: "" }],
        },
      ],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe("Fields", () => {
  const mockRemoveField = vi.fn();
  const defaultProps = {
    index: 0,
    fieldIndex: 0,
    field: { id: "field-1" },
    fieldsLength: 1,
    removeField: mockRemoveField,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render field label", () => {
      render(
        <TestWrapper>
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      const label = screen.getByText(/field 1/i);
      expect(label).toBeInTheDocument();
    });

    it("should render key input field", () => {
      render(
        <TestWrapper>
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      const keyInput = screen.getByTestId("text-input");
      expect(keyInput).toBeInTheDocument();
      expect(keyInput).toHaveAttribute("placeholder", "e.g. name");
    });

    it("should render value type selector", () => {
      render(
        <TestWrapper>
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      const typeSelector = screen.getByTestId("value-type-selector");
      expect(typeSelector).toBeInTheDocument();
    });

    it("should render remove field button", () => {
      render(
        <TestWrapper>
          <Fields {...defaultProps} fieldsLength={2} />
        </TestWrapper>,
      );

      const removeButton = screen.getByRole("button", {
        name: "entity-1-remove-field-1",
      });
      expect(removeButton).toBeInTheDocument();
    });
  });

  describe("Remove Button State", () => {
    it("should disable remove button when only one field exists", () => {
      render(
        <TestWrapper>
          <Fields {...defaultProps} fieldsLength={1} />
        </TestWrapper>,
      );

      const removeButton = screen.getByRole("button", {
        name: "entity-1-remove-field-1",
      });
      expect(removeButton).toBeDisabled();
    });

    it("should enable remove button when multiple fields exist", () => {
      render(
        <TestWrapper>
          <Fields {...defaultProps} fieldsLength={2} />
        </TestWrapper>,
      );

      const removeButton = screen.getByRole("button", {
        name: "entity-1-remove-field-1",
      });
      expect(removeButton).not.toBeDisabled();
    });
  });

  describe("Conditional Rendering - Reference Type", () => {
    it("should render text input for reference type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  {
                    id: "field-1",
                    key: "userId",
                    type: "reference",
                    value: "User",
                  },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      const textInputs = screen.getAllByTestId("text-input");
      // Should have key input + value input for reference
      expect(textInputs).toHaveLength(2);
      expect(textInputs[1]).toHaveAttribute("placeholder", "e.g. User");
    });

    it("should not render number input for reference type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  {
                    id: "field-1",
                    key: "userId",
                    type: "reference",
                    value: "User",
                  },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      expect(screen.queryByTestId("number-input")).not.toBeInTheDocument();
    });
  });

  describe("Conditional Rendering - One-of Type", () => {
    it("should render text input for one-of type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  {
                    id: "field-1",
                    key: "status",
                    type: "one-of",
                    value: "active, inactive",
                  },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      const textInputs = screen.getAllByTestId("text-input");
      expect(textInputs).toHaveLength(2);
    });
  });

  describe("Conditional Rendering - String Type", () => {
    it("should render number input for string type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  {
                    id: "field-1",
                    key: "description",
                    type: "string",
                    value: 10,
                  },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      expect(screen.getByTestId("number-input")).toBeInTheDocument();
      expect(screen.queryByTestId("nested-form-item")).not.toBeInTheDocument();
    });

    it("should not render text input for string type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  {
                    id: "field-1",
                    key: "description",
                    type: "string",
                    value: 10,
                  },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      const textInputs = screen.getAllByTestId("text-input");
      // Only key input, no value input
      expect(textInputs).toHaveLength(1);
    });
  });

  describe("Conditional Rendering - String Array Type", () => {
    it("should render number input for string-array type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  {
                    id: "field-1",
                    key: "tags",
                    type: "string-array",
                    value: 5,
                  },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      expect(screen.getByTestId("number-input")).toBeInTheDocument();
    });
  });

  describe("Conditional Rendering - Number Array Type", () => {
    it("should render number input for number-array type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  {
                    id: "field-1",
                    key: "scores",
                    type: "number-array",
                    value: 3,
                  },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      expect(screen.getByTestId("number-input")).toBeInTheDocument();
    });
  });

  describe("Conditional Rendering - Nested Type", () => {
    it("should render nested form for nested type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  { id: "field-1", key: "address", type: "nested", value: "" },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      expect(screen.getByTestId("nested-form-item")).toBeInTheDocument();
    });

    it("should not render additional inputs for nested type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  { id: "field-1", key: "address", type: "nested", value: "" },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      expect(screen.queryByTestId("number-input")).not.toBeInTheDocument();
      const textInputs = screen.getAllByTestId("text-input");
      // Only key input, no value input
      expect(textInputs).toHaveLength(1);
    });
  });

  describe("Conditional Rendering - Simple Types", () => {
    it("should not render additional inputs for name type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  { id: "field-1", key: "fullName", type: "name", value: "" },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      const textInputs = screen.getAllByTestId("text-input");
      expect(textInputs).toHaveLength(1); // Only key input
      expect(screen.queryByTestId("number-input")).not.toBeInTheDocument();
      expect(screen.queryByTestId("nested-form-item")).not.toBeInTheDocument();
    });

    it("should not render additional inputs for email type", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              {
                fields: [
                  { id: "field-1", key: "userEmail", type: "email", value: "" },
                ],
              },
            ],
          }}
        >
          <Fields {...defaultProps} />
        </TestWrapper>,
      );

      const textInputs = screen.getAllByTestId("text-input");
      expect(textInputs).toHaveLength(1);
    });
  });

  describe("Multiple Entities and Fields", () => {
    it("should render with correct labels for entity 2 field 3", () => {
      render(
        <TestWrapper
          defaultValues={{
            schemas: [
              { fields: [{ id: "field-1", key: "", type: "name", value: "" }] },
              {
                fields: [
                  { id: "field-1", key: "", type: "name", value: "" },
                  { id: "field-2", key: "", type: "name", value: "" },
                  {
                    id: "field-3",
                    key: "testKey",
                    type: "reference",
                    value: "User",
                  },
                ],
              },
            ],
          }}
        >
          <Fields
            index={1}
            fieldIndex={2}
            fieldsLength={3}
            removeField={mockRemoveField}
          />
        </TestWrapper>,
      );

      expect(screen.getByText(/^Field 3$/i)).toBeInTheDocument();
    });
  });
});
