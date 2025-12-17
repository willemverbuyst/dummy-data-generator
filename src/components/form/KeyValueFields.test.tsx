import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KeyValueFields } from "./KeyValueFields";

// Mock child components
vi.mock("./buttons/RemoveFieldButton", () => ({
	RemoveFieldButton: ({
		remove,
		index,
		disabled,
		title,
	}: {
		remove: (index: number) => void;
		index: number;
		disabled: boolean;
		title: string;
	}) => (
		<button
			onClick={() => remove(index)}
			disabled={disabled}
			title={title}
			data-testid="remove-field-button"
		>
			Remove
		</button>
	),
}));

vi.mock("./inputs/TextInput", () => ({
	TextInput: ({
		field,
		placeholder,
		label,
	}: {
		field: { value: string; onChange: (value: string) => void };
		placeholder: string;
		label: string;
	}) => (
		<input
			value={field.value}
			onChange={(e) => field.onChange(e.target.value)}
			placeholder={placeholder}
			aria-label={label}
			data-testid="text-input"
		/>
	),
}));

vi.mock("./inputs/NumberInput", () => ({
	NumberInput: ({
		field,
	}: {
		field: { value: number; onChange: (value: number) => void };
	}) => (
		<input
			type="number"
			value={field.value}
			onChange={(e) => field.onChange(Number(e.target.value))}
			data-testid="number-input"
		/>
	),
}));

vi.mock("./inputs/ValueTypeSelector", () => ({
	ValueTypeSelector: ({
		field,
	}: {
		field: { value: string; onChange: (value: string) => void };
	}) => (
		<select
			value={field.value}
			onChange={(e) => field.onChange(e.target.value)}
			data-testid="value-type-selector"
		>
			<option value="name">name</option>
			<option value="email">email</option>
			<option value="reference">reference</option>
			<option value="one-of">one-of</option>
			<option value="string">string</option>
			<option value="string-array">string-array</option>
			<option value="number-array">number-array</option>
			<option value="nested">nested</option>
		</select>
	),
}));

vi.mock("./NestedFormItem", () => ({
	NestedFormItem: ({
		index,
		fieldIndex,
	}: {
		index: number;
		fieldIndex: number;
	}) => (
		<div data-testid="nested-form-item">
			Nested Form for Entity {index + 1} Field {fieldIndex + 1}
		</div>
	),
}));

// Wrapper component to provide form context
function TestWrapper({
	children,
	defaultValues,
}: {
	children: React.ReactNode;
	defaultValues?: object;
}) {
	const methods = useForm({
		defaultValues: defaultValues || {
			schemas: [
				{
					fields: [{ id: "field-1", key: "testKey", type: "name", value: "" }],
				},
			],
		},
	});

	return <FormProvider {...methods}>{children}</FormProvider>;
}

describe("KeyValueFields", () => {
	const mockRemoveField = vi.fn();
	const defaultProps = {
		index: 0,
		fieldIndex: 0,
		field: { id: "field-1" },
		keyValueFieldsLength: 1,
		removeField: mockRemoveField,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("Basic Rendering", () => {
		it("should render key input field", () => {
			render(
				<TestWrapper>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			const keyInput = screen.getByLabelText(/entity 1 key 1/i);
			expect(keyInput).toBeInTheDocument();
			expect(keyInput).toHaveAttribute("placeholder", "e.g. name");
		});

		it("should render value type selector", () => {
			render(
				<TestWrapper>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			const typeSelector = screen.getByTestId("value-type-selector");
			expect(typeSelector).toBeInTheDocument();
		});

		it("should render remove field button", () => {
			render(
				<TestWrapper>
					<KeyValueFields {...defaultProps} keyValueFieldsLength={2} />
				</TestWrapper>,
			);

			const removeButton = screen.getByTestId("remove-field-button");
			expect(removeButton).toBeInTheDocument();
			expect(removeButton).toHaveAttribute("title", "entity-1-remove-field-1");
		});
	});

	describe("Remove Button State", () => {
		it("should disable remove button when only one field exists", () => {
			render(
				<TestWrapper>
					<KeyValueFields {...defaultProps} keyValueFieldsLength={1} />
				</TestWrapper>,
			);

			const removeButton = screen.getByTestId("remove-field-button");
			expect(removeButton).toBeDisabled();
		});

		it("should enable remove button when multiple fields exist", () => {
			render(
				<TestWrapper>
					<KeyValueFields {...defaultProps} keyValueFieldsLength={2} />
				</TestWrapper>,
			);

			const removeButton = screen.getByTestId("remove-field-button");
			expect(removeButton).not.toBeDisabled();
		});
	});

	describe("Conditional Rendering - Reference Type", () => {
		it("should render text input for reference type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{
										id: "field-1",
										key: "userId",
										type: "reference",
										value: "User",
									},
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			const textInputs = screen.getAllByTestId("text-input");
			// Should have key input + value input for reference
			expect(textInputs).toHaveLength(2);
			expect(textInputs[1]).toHaveAttribute("placeholder", "e.g. User");
		});

		it("should not render number input for reference type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{
										id: "field-1",
										key: "userId",
										type: "reference",
										value: "User",
									},
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			expect(screen.queryByTestId("number-input")).not.toBeInTheDocument();
		});
	});

	describe("Conditional Rendering - One-of Type", () => {
		it("should render text input for one-of type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{
										id: "field-1",
										key: "status",
										type: "one-of",
										value: "active, inactive",
									},
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			const textInputs = screen.getAllByTestId("text-input");
			expect(textInputs).toHaveLength(2);
		});
	});

	describe("Conditional Rendering - String Type", () => {
		it("should render number input for string type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{
										id: "field-1",
										key: "description",
										type: "string",
										value: 10,
									},
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			expect(screen.getByTestId("number-input")).toBeInTheDocument();
			expect(screen.queryByTestId("nested-form-item")).not.toBeInTheDocument();
		});

		it("should not render text input for string type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{
										id: "field-1",
										key: "description",
										type: "string",
										value: 10,
									},
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			const textInputs = screen.getAllByTestId("text-input");
			// Only key input, no value input
			expect(textInputs).toHaveLength(1);
		});
	});

	describe("Conditional Rendering - String Array Type", () => {
		it("should render number input for string-array type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{
										id: "field-1",
										key: "tags",
										type: "string-array",
										value: 5,
									},
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			expect(screen.getByTestId("number-input")).toBeInTheDocument();
		});
	});

	describe("Conditional Rendering - Number Array Type", () => {
		it("should render number input for number-array type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{
										id: "field-1",
										key: "scores",
										type: "number-array",
										value: 3,
									},
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			expect(screen.getByTestId("number-input")).toBeInTheDocument();
		});
	});

	describe("Conditional Rendering - Nested Type", () => {
		it("should render nested form for nested type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{ id: "field-1", key: "address", type: "nested", value: "" },
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			expect(screen.getByTestId("nested-form-item")).toBeInTheDocument();
			expect(
				screen.getByText(/nested form for entity 1 field 1/i),
			).toBeInTheDocument();
		});

		it("should not render additional inputs for nested type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{ id: "field-1", key: "address", type: "nested", value: "" },
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			expect(screen.queryByTestId("number-input")).not.toBeInTheDocument();
			const textInputs = screen.getAllByTestId("text-input");
			// Only key input, no value input
			expect(textInputs).toHaveLength(1);
		});
	});

	describe("Conditional Rendering - Simple Types", () => {
		it("should not render additional inputs for name type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{ id: "field-1", key: "fullName", type: "name", value: "" },
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			const textInputs = screen.getAllByTestId("text-input");
			expect(textInputs).toHaveLength(1); // Only key input
			expect(screen.queryByTestId("number-input")).not.toBeInTheDocument();
			expect(screen.queryByTestId("nested-form-item")).not.toBeInTheDocument();
		});

		it("should not render additional inputs for email type", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{
								fields: [
									{ id: "field-1", key: "userEmail", type: "email", value: "" },
								],
							},
						],
					}}
				>
					<KeyValueFields {...defaultProps} />
				</TestWrapper>,
			);

			const textInputs = screen.getAllByTestId("text-input");
			expect(textInputs).toHaveLength(1);
		});
	});

	describe("Multiple Entities and Fields", () => {
		it("should render with correct labels for entity 2 field 3", () => {
			render(
				<TestWrapper
					defaultValues={{
						schemas: [
							{ fields: [{ id: "field-1", key: "", type: "name", value: "" }] },
							{
								fields: [
									{ id: "field-1", key: "", type: "name", value: "" },
									{ id: "field-2", key: "", type: "name", value: "" },
									{
										id: "field-3",
										key: "testKey",
										type: "reference",
										value: "User",
									},
								],
							},
						],
					}}
				>
					<KeyValueFields
						index={1}
						fieldIndex={2}
						field={{ id: "field-3" }}
						keyValueFieldsLength={3}
						removeField={mockRemoveField}
					/>
				</TestWrapper>,
			);

			expect(screen.getByLabelText(/^entity 2 key 3$/i)).toBeInTheDocument();
			expect(
				screen.getByLabelText(/entity 2 key 3 value/i),
			).toBeInTheDocument();
			expect(screen.getByTitle("entity-2-remove-field-3")).toBeInTheDocument();
		});
	});
});
