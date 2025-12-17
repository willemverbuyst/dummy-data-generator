import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RemoveEntityButton } from "./RemoveEntityButton";

describe("RemoveEntityButton", () => {
	const mockRemove = vi.fn();
	const defaultProps = {
		disabled: false,
		remove: mockRemove,
		index: 0,
		title: "remove-entity",
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

	it("calls remove with correct index when clicked", async () => {
		const user = userEvent.setup();
		render(<RemoveEntityButton {...defaultProps} index={2} />);

		const button = screen.getByRole("button");
		await user.click(button);

		await waitFor(() => {
			expect(mockRemove).toHaveBeenCalledWith(2);
			expect(mockRemove).toHaveBeenCalledTimes(1);
		});
	});

	it("is disabled when disabled prop is true", () => {
		render(<RemoveEntityButton {...defaultProps} disabled={true} />);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	it("does not call remove when disabled and clicked", async () => {
		const user = userEvent.setup();
		render(<RemoveEntityButton {...defaultProps} disabled={true} />);

		const button = screen.getByRole("button");
		await user.click(button);

		expect(mockRemove).not.toHaveBeenCalled();
	});

	it("is enabled when disabled prop is false", () => {
		render(<RemoveEntityButton {...defaultProps} disabled={false} />);

		const button = screen.getByRole("button");
		expect(button).not.toBeDisabled();
	});

	it("shows tooltip on hover", async () => {
		render(<RemoveEntityButton {...defaultProps} />);
		const user = userEvent.setup();

		expect(screen.queryByText("Remove")).not.toBeInTheDocument();

		const button = screen.getByRole("button");
		await user.hover(button);

		await waitFor(async () => {
			const tooltip = await screen.findByRole("tooltip");
			expect(tooltip).toHaveTextContent("Remove Entity");
		});
	});
});
