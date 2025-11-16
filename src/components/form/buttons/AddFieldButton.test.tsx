import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defaultField } from "../formSchema";
import { AddFieldButton } from "./AddFieldButton";

describe("AddFieldButton", () => {
  it("renders button with correct attribute", () => {
    const mockAppend = vi.fn();
    render(<AddFieldButton append={mockAppend} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders the button with PlusIcon", () => {
    const mockAppend = vi.fn();
    render(<AddFieldButton append={mockAppend} />);

    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("svg")).toHaveClass("lucide-plus");
  });

  it("calls append with defaultField when clicked", async () => {
    const user = userEvent.setup();
    const mockAppend = vi.fn();
    render(<AddFieldButton append={mockAppend} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockAppend).toHaveBeenCalledTimes(1);
    expect(mockAppend).toHaveBeenCalledWith(defaultField);
  });

  it("calls append multiple times when clicked multiple times", async () => {
    const user = userEvent.setup();
    const mockAppend = vi.fn();
    render(<AddFieldButton append={mockAppend} />);

    const button = screen.getByRole("button");
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(mockAppend).toHaveBeenCalledTimes(3);
  });
});
