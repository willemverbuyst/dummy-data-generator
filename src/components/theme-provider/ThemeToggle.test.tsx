import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./useTheme";

// Mock the useTheme hook
const mockSetTheme = vi.fn();
const mockUseTheme = vi.mocked(useTheme);

vi.mock("./useTheme");

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
	Moon: () => <div data-testid="moon-icon">Moon</div>,
	Sun: () => <div data-testid="sun-icon">Sun</div>,
}));

// Mock Button component
vi.mock("../ui/button", () => ({
	Button: ({
		children,
		onClick,
		...props
	}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
		<button onClick={onClick} {...props}>
			{children}
		</button>
	),
}));

describe("ThemeToggle", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Reset to default "light" theme before each test
		mockUseTheme.mockReturnValue({
			theme: "light",
			setTheme: mockSetTheme,
		});
	});

	it("renders moon icon when theme is light", () => {
		render(<ThemeToggle />);
		expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
	});

	it("renders sun icon when theme is dark", () => {
		mockUseTheme.mockReturnValue({
			theme: "dark",
			setTheme: mockSetTheme,
		});

		render(<ThemeToggle />);
		expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
	});

	it('calls setTheme with "dark" when current theme is light', () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");

		fireEvent.click(button);

		expect(mockSetTheme).toHaveBeenCalledWith("dark");
	});

	it('calls setTheme with "light" when current theme is dark', () => {
		mockUseTheme.mockReturnValue({
			theme: "dark",
			setTheme: mockSetTheme,
		});

		render(<ThemeToggle />);
		const button = screen.getByRole("button");

		fireEvent.click(button);

		expect(mockSetTheme).toHaveBeenCalledWith("light");
	});

	it("renders button with correct attributes", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");

		expect(button).toHaveAttribute("type", "button");
	});
});
