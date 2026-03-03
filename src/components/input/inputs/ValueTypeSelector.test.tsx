import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ValueTypeSelector } from "./ValueTypeSelector";

describe("ValueTypeSelector", () => {
  const mockField = {
    name: "selectValue",
    value: "",
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  };

  it("renders simple type options", async () => {
    render(<ValueTypeSelector field={mockField} includeComplex={false} />);
    const user = userEvent.setup();
    const select = screen.getByRole("combobox", {
      name: "selectValue",
    });

    await user.click(select);

    expect(screen.getByRole("option", { name: /word/i })).toBeInTheDocument();
    expect(screen.queryByText(/nested/i)).not.toBeInTheDocument();
  });

  it("renders complex type options", async () => {
    render(<ValueTypeSelector field={mockField} includeComplex={true} />);
    const user = userEvent.setup();
    const select = screen.getByRole("combobox", {
      name: "selectValue",
    });

    await user.click(select);

    expect(screen.queryByText(/nested/i)).toBeInTheDocument();
  });
});
