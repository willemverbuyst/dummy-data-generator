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

    expect(screen.getByText("Test Number")).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<NumberInput field={mockField} fieldState={mockFieldState} />);

    expect(screen.queryByText("Test Number")).not.toBeInTheDocument();
  });

  it("displays the correct value", () => {
    render(
      <NumberInput
        field={mockField}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(5);
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

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(1);
  });

  it("defaults to 1000 when value is greater than 1000", () => {
    const fieldWithHighValue = { ...mockField, value: 1500 };
    render(
      <NumberInput
        field={fieldWithHighValue}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(1000);
  });

  it("calls onChange with 1000 when value is greater than 1000", () => {
    const onChange = vi.fn();
    const fieldWithOnChange = { ...mockField, onChange };

    render(
      <NumberInput
        field={fieldWithOnChange}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "1500" } });

    expect(onChange).toHaveBeenCalledWith(1000);
  });

  it("calls onChange with 1 when value is not a number", () => {
    const onChange = vi.fn();
    const fieldWithOnChange = { ...mockField, onChange };

    render(
      <NumberInput
        field={fieldWithOnChange}
        fieldState={mockFieldState}
        label="Test Number"
      />,
    );

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "invalid" } });

    expect(onChange).toHaveBeenCalledWith(1);
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

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "10" } });

    expect(onChange).toHaveBeenCalledWith(10);
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
    const input = screen.getByRole("spinbutton");
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

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("autocomplete", "off");
  });
});
