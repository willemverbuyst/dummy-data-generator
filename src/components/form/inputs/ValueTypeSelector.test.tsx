import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { ValueTypeSelector } from "./ValueTypeSelector";

// Mock the business types
vi.mock("@/types", () => ({
	fieldValueTypeSimple: ["string", "number", "boolean"],
	fieldValueTypeComplex: ["array-string", "object-nested"],
}));

// Mock the UI components
vi.mock("@/components/ui/field", () => ({
	Field: ({
		children,
		...props
	}: {
		children: ReactNode;
		[key: string]: unknown;
	}) => <div {...props}>{children}</div>,
	FieldError: ({ errors }: { errors?: Array<{ message?: string }> }) => (
		<div data-testid="field-error">{errors?.[0]?.message}</div>
	),
}));

vi.mock("@/components/ui/select", () => ({
	Select: ({
		children,
		onValueChange,
		...props
	}: {
		children: ReactNode;
		onValueChange?: (value: string) => void;
		[key: string]: unknown;
	}) => {
		void onValueChange;
		return (
			<div data-testid="select" {...props}>
				{children}
			</div>
		);
	},
	SelectContent: ({ children }: { children: ReactNode }) => (
		<div data-testid="select-content">{children}</div>
	),
	SelectGroup: ({ children }: { children: ReactNode }) => (
		<div data-testid="select-group">{children}</div>
	),
	SelectItem: ({ children, value }: { children: ReactNode; value: string }) => (
		<div data-testid={`select-item-${value}`}>{children}</div>
	),
	SelectLabel: ({ children }: { children: ReactNode }) => (
		<div data-testid="select-label">{children}</div>
	),
	SelectTrigger: ({
		children,
		className,
	}: {
		children: ReactNode;
		className?: string;
	}) => (
		<div data-testid="select-trigger" className={className}>
			{children}
		</div>
	),
	SelectValue: ({ placeholder }: { placeholder?: string }) => (
		<div data-testid="select-value">{placeholder}</div>
	),
}));

describe("ValueTypeSelector", () => {
	const mockField = {
		name: "valueType",
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

	it("renders select with placeholder", () => {
		render(<ValueTypeSelector field={mockField} fieldState={mockFieldState} />);

		expect(screen.getByTestId("select-value")).toHaveTextContent(
			"Select a value type",
		);
	});

	it("renders simple type options", () => {
		render(<ValueTypeSelector field={mockField} fieldState={mockFieldState} />);

		expect(screen.getByTestId("select-item-string")).toHaveTextContent(
			"string",
		);
		expect(screen.getByTestId("select-item-number")).toHaveTextContent(
			"number",
		);
		expect(screen.getByTestId("select-item-boolean")).toHaveTextContent(
			"boolean",
		);
	});

	it("renders complex type options with formatted labels", () => {
		render(<ValueTypeSelector field={mockField} fieldState={mockFieldState} />);

		expect(screen.getByTestId("select-item-array-string")).toHaveTextContent(
			"array string",
		);
		expect(screen.getByTestId("select-item-object-nested")).toHaveTextContent(
			"object nested",
		);
	});

	it("renders group labels", () => {
		render(<ValueTypeSelector field={mockField} fieldState={mockFieldState} />);

		const labels = screen.getAllByTestId("select-label");
		expect(labels[0]).toHaveTextContent("Simple type");
		expect(labels[1]).toHaveTextContent("Complex type");
	});

	it("sets data-invalid attribute when field is invalid", () => {
		const invalidFieldState = { ...mockFieldState, invalid: true };
		render(
			<ValueTypeSelector field={mockField} fieldState={invalidFieldState} />,
		);

		const field = screen.getByTestId("select").closest("[data-invalid]");
		expect(field).toHaveAttribute("data-invalid", "true");
	});

	it("shows error when field is invalid", () => {
		const invalidFieldState = {
			...mockFieldState,
			invalid: true,
			error: { message: "This field is required", type: "required" },
		};

		render(
			<ValueTypeSelector field={mockField} fieldState={invalidFieldState} />,
		);

		expect(screen.getByTestId("field-error")).toHaveTextContent(
			"This field is required",
		);
	});

	it("does not show error when field is valid", () => {
		render(<ValueTypeSelector field={mockField} fieldState={mockFieldState} />);

		expect(screen.queryByTestId("field-error")).not.toBeInTheDocument();
	});

	it("passes field props to Select component", () => {
		const fieldWithValue = { ...mockField, value: "string" };
		render(
			<ValueTypeSelector field={fieldWithValue} fieldState={mockFieldState} />,
		);

		const select = screen.getByTestId("select");
		expect(select).toHaveAttribute("name", "valueType");
		expect(select).toHaveAttribute("value", "string");
	});
});
