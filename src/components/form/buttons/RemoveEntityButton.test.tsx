import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { RemoveEntityButton } from "./RemoveEntityButton";

describe("RemoveEntityButton", () => {
  const mockRemove = vi.fn();
  const defaultProps = {
    remove: mockRemove,
    index: 0,
  };

  beforeEach(() => {
    mockRemove.mockClear();
  });

  it("renders button with correct attributes", () => {
    render(<RemoveEntityButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders the button with TrashIcon", () => {
    render(<RemoveEntityButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("svg")).toHaveClass("lucide-trash");
  });

  it("calls remove with correct index when clicked", () => {
    render(<RemoveEntityButton {...defaultProps} index={2} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockRemove).toHaveBeenCalledWith(2);
    expect(mockRemove).toHaveBeenCalledTimes(1);
  });

  it("shows tooltip on hover", async () => {
    render(<RemoveEntityButton {...defaultProps} />);
    const user = userEvent.setup();

    expect(screen.queryByText("Remove")).not.toBeInTheDocument();

    const button = screen.getByRole("button");
    await user.hover(button);

    await waitFor(async () => {
      const tooltip = await screen.findByRole("tooltip");
      expect(tooltip).toHaveTextContent("Remove");
    });
  });
});
