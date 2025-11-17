import { fireEvent, render, screen } from "@testing-library/react";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  const mockField = {
    name: "testNumber",
    value: 5,
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

  it("renders with label", () => {
    render(
      <NumberInput
        field={mockField}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const minusButton = screen.getByRole("button", { name: "-" });
    const plusButton = screen.getByRole("button", { name: "+" });

    expect(minusButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();

    expect(screen.getByLabelText("Test Number")).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<NumberInput field={mockField} fieldState={mockFieldState} />);

    const minusButton = screen.getByRole("button", { name: "-" });
    const plusButton = screen.getByRole("button", { name: "+" });

    expect(minusButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();

    expect(screen.queryByLabelText("Test Number")).not.toBeInTheDocument();
  });

  it("displays the correct value", () => {
    render(
      <NumberInput
        field={mockField}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("5");
  });

  it("defaults to 1 when value is not a number", () => {
    const fieldWithStringValue = { ...mockField, value: "invalid" };
    render(
      <NumberInput
        field={fieldWithStringValue}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("1");
  });

  it("calls onChange with number when input changes", () => {
    const onChange = vi.fn();
    const fieldWithOnChange = { ...mockField, onChange };

    render(
      <NumberInput
        field={fieldWithOnChange}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "10" } });

    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("shows error when field is invalid", () => {
    const invalidFieldState = {
      ...mockFieldState,
      invalid: true,
      error: { message: "Required field", type: "required" },
    };

    render(
      <NumberInput
        field={mockField}
        fieldState={invalidFieldState}
        label="Test Number"
      />,
    );

    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("sets aria-invalid when field is invalid", () => {
    const invalidFieldState = {
      ...mockFieldState,
      invalid: true,
      error: { message: "Invalid", type: "required" },
    };

    render(
      <NumberInput
        field={mockField}
        fieldState={invalidFieldState}
        label="Test Number"
      />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("has autoComplete off", () => {
    render(
      <NumberInput
        field={mockField}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("autocomplete", "off");
  });

  it("increments and decrements value on button clicks", () => {
    const onChange = vi.fn();
    const fieldWithOnChange = { ...mockField, onChange };

    render(
      <NumberInput
        field={fieldWithOnChange}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const minusButton = screen.getByRole("button", { name: "-" });
    const plusButton = screen.getByRole("button", { name: "+" });

    fireEvent.click(minusButton);
    expect(onChange).toHaveBeenCalledWith(4);

    fireEvent.click(plusButton);
    expect(onChange).toHaveBeenCalledWith(6);
  });
});
