import { render, screen } from "@testing-library/react";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  const mockField = {
    name: "testField",
    value: "",
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  };

  const mockFieldState = {
    invalid: false,
    error: undefined,
    isDirty: false,
    isTouched: false,
    isValidating: false,
  };

  it("renders input with correct attributes", () => {
    render(
      <TextInput
        field={mockField}
        fieldState={mockFieldState}
        label="Test Label"
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "testField");
    expect(input).toHaveAttribute("name", "testField");
    expect(input).toHaveAttribute("autoComplete", "off");
  });

  it("renders label when provided", () => {
    render(
      <TextInput
        field={mockField}
        fieldState={mockFieldState}
        label="Test Label"
      />,
    );

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "testField");
  });

  it("hides label when hideLabel is true", () => {
    render(
      <TextInput
        field={mockField}
        fieldState={mockFieldState}
        label="Test Label"
        hideLabel={true}
      />,
    );

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("hidden");
  });

  it("shows label when hideLabel is false", () => {
    render(
      <TextInput
        field={mockField}
        fieldState={mockFieldState}
        label="Test Label"
        hideLabel={false}
      />,
    );

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).not.toHaveClass("hidden");
  });

  it("renders placeholder when provided", () => {
    render(
      <TextInput
        field={mockField}
        fieldState={mockFieldState}
        placeholder="Enter text"
        label="Test Label"
      />,
    );

    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("shows invalid state when fieldState is invalid", () => {
    const invalidFieldState = {
      ...mockFieldState,
      invalid: true,
      error: { type: "required", message: "This field is required" },
    };

    render(
      <TextInput
        field={mockField}
        fieldState={invalidFieldState}
        label="Test Label"
      />,
    );

    const field = screen.getByRole("textbox").closest("[data-invalid]");
    const input = screen.getByRole("textbox");

    expect(field).toHaveAttribute("data-invalid", "true");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("displays error message when field is invalid", () => {
    const invalidFieldState = {
      ...mockFieldState,
      invalid: true,
      error: { type: "required", message: "This field is required" },
    };

    render(
      <TextInput
        field={mockField}
        fieldState={invalidFieldState}
        label="Test Label"
      />,
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("does not show error when field is valid", () => {
    render(
      <TextInput
        field={mockField}
        fieldState={mockFieldState}
        label="Test Label"
      />,
    );

    const field = screen.getByRole("textbox").closest("[data-invalid]");
    const input = screen.getByRole("textbox");

    expect(field).toHaveAttribute("data-invalid", "false");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });
});
