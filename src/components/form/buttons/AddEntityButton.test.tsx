import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defaultSchema } from "../formSchema";
import { AddEntityButton } from "./AddEntityButton";

describe("AddEntityButton", () => {
  it("renders the button with correct text", () => {
    const mockAppend = vi.fn();
    render(<AddEntityButton append={mockAppend} />);

    expect(
      screen.getByRole("button", { name: "Add Entity" }),
    ).toBeInTheDocument();
  });

  it("has correct button attributes", () => {
    const mockAppend = vi.fn();
    render(<AddEntityButton append={mockAppend} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("calls append with defaultSchema when clicked", async () => {
    const user = userEvent.setup();
    const mockAppend = vi.fn();
    render(<AddEntityButton append={mockAppend} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockAppend).toHaveBeenCalledTimes(1);
    expect(mockAppend).toHaveBeenCalledWith(defaultSchema);
  });

  it("calls append multiple times when clicked multiple times", async () => {
    const user = userEvent.setup();
    const mockAppend = vi.fn();
    render(<AddEntityButton append={mockAppend} />);

    const button = screen.getByRole("button");
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(mockAppend).toHaveBeenCalledTimes(3);
  });
});
