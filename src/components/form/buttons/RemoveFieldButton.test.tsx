import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RemoveFieldButton } from "./RemoveFieldButton";

describe("RemoveFieldButton", () => {
	const mockRemove = vi.fn();
	const defaultProps = {
		disabled: false,
		remove: mockRemove,
		index: 0,
		title: "remove-field",
	};

	beforeEach(() => {
		mockRemove.mockClear();
	});

	it("renders button with correct attributes", () => {
		render(<RemoveFieldButton {...defaultProps} />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("type", "button");
	});

	it("renders the button with MinusIcon", () => {
		render(<RemoveFieldButton {...defaultProps} />);

		const button = screen.getByRole("button");
		expect(button.querySelector("svg")).toBeInTheDocument();
		expect(button.querySelector("svg")).toHaveClass("lucide-minus");
	});

	it("calls remove with correct index when clicked", async () => {
		const user = userEvent.setup();
		render(<RemoveFieldButton {...defaultProps} index={2} />);

		const button = screen.getByRole("button");
		await user.click(button);

		expect(mockRemove).toHaveBeenCalledTimes(1);
		expect(mockRemove).toHaveBeenCalledWith(2);
	});

	it("is disabled when disabled prop is true", () => {
		render(<RemoveFieldButton {...defaultProps} disabled={true} />);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	it("does not call remove when disabled and clicked", async () => {
		const user = userEvent.setup();
		render(<RemoveFieldButton {...defaultProps} disabled={true} />);

		const button = screen.getByRole("button");
		await user.click(button);

		expect(mockRemove).not.toHaveBeenCalled();
	});

	it("is enabled when disabled prop is false", () => {
		render(<RemoveFieldButton {...defaultProps} disabled={false} />);

		const button = screen.getByRole("button");
		expect(button).not.toBeDisabled();
	});
});
