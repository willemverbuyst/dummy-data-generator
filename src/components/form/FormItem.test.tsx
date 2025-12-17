import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, type Resolver, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { FormItem } from "./FormItem";
import { type FormSchema, formSchema } from "./formSchema";

// Mock child components
vi.mock("./buttons/AddFieldButton", () => ({
	AddFieldButton: ({ append }: { append: () => void }) => (
		<button type="button" onClick={append} data-testid="add-field-button">
			Add Field
		</button>
	),
}));

vi.mock("./buttons/RemoveEntityButton", () => ({
	RemoveEntityButton: ({
		remove,
		index,
	}: {
		remove: (index: number) => void;
		index: number;
	}) => (
		<button
			type="button"
			onClick={() => remove(index)}
			data-testid="remove-entity-button"
		>
			Remove Entity
		</button>
	),
}));

vi.mock("./buttons/RemoveFieldButton", () => ({
	RemoveFieldButton: ({
		remove,
		index,
		disabled,
	}: {
		remove: (index: number) => void;
		index: number;
		disabled: boolean;
	}) => (
		<button
			type="button"
			onClick={() => remove(index)}
			disabled={disabled}
			data-testid={`remove-field-${index}`}
		>
			Remove Field
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
		fieldState: unknown;
		placeholder?: string;
		label?: string;
	}) => (
		<div>
			{label && <label htmlFor="test-input">{label}</label>}
			<input
				id="test-input"
				value={field.value}
				onChange={(e) => field.onChange(e.target.value)}
				placeholder={placeholder}
				data-testid={label ? `text-input-${label}` : "text-input"}
			/>
		</div>
	),
}));

vi.mock("./inputs/NumberInput", () => ({
	NumberInput: ({
		field,
		label,
	}: {
		field: { value: number; onChange: (value: number) => void };
		fieldState: unknown;
		label?: string;
	}) => (
		<div>
			{label && <label htmlFor="test-input">{label}</label>}
			<input
				id="test-input"
				type="number"
				value={field.value}
				onChange={(e) => field.onChange(Number(e.target.value))}
				data-testid={label ? `number-input-${label}` : "number-input"}
			/>
		</div>
	),
}));

vi.mock("./inputs/ValueTypeSelector", () => ({
	ValueTypeSelector: ({
		field,
	}: {
		field: { value: string; onChange: (value: string) => void };
		fieldState: unknown;
	}) => (
		<select
			value={field.value}
			onChange={(e) => field.onChange(e.target.value)}
			data-testid="value-type-selector"
		>
			<option value="string">String</option>
			<option value="number">Number</option>
			<option value="reference">Reference</option>
			<option value="one-of">One Of</option>
			<option value="string-array">String Array</option>
			<option value="number-array">Number Array</option>
			<option value="nested">Nested</option>
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
		<div data-testid={`nested-form-item-${index}-${fieldIndex}`}>
			Nested Form Item
		</div>
	),
}));

function TestWrapper({
	index = 0,
	defaultValues,
}: {
	index?: number;
	defaultValues?: FormSchema;
}) {
	const removeSchema = vi.fn();
	const schemaId = "test-schema-id";

	const defaultFormValues: FormSchema = defaultValues || {
		schemas: [
			{
				entity: "User",
				numberOfRecords: 5,
				fields: [
					{ key: "name", type: "string", value: 10 },
					{ key: "email", type: "email" },
				],
			},
		],
	};

	const methods = useForm<FormSchema>({
		resolver: zodResolver(formSchema) as Resolver<FormSchema>,
		defaultValues: defaultFormValues,
	});

	return (
		<FormProvider {...methods}>
			<FormItem
				index={index}
				schemaId={schemaId}
				removeSchema={removeSchema}
				schemasLength={1}
			/>
		</FormProvider>
	);
}

describe("FormItem", () => {
	it("should render entity input with correct label", () => {
		render(<TestWrapper />);

		expect(screen.getByText("Entity 1")).toBeInTheDocument();
		expect(screen.getByTestId("text-input-Entity 1")).toBeInTheDocument();
	});

	it("should render entity input with correct value", () => {
		render(<TestWrapper />);

		const entityInput = screen.getByTestId("text-input-Entity 1");
		expect(entityInput).toHaveValue("User");
	});

	it("should render number of records input", () => {
		render(<TestWrapper />);

		expect(screen.getByText("Number of Records")).toBeInTheDocument();
		expect(
			screen.getByTestId("number-input-Number of Records"),
		).toBeInTheDocument();
	});

	it("should render number of records with correct value", () => {
		render(<TestWrapper />);

		const recordsInput = screen.getByTestId("number-input-Number of Records");
		expect(recordsInput).toHaveValue(5);
	});

	it("should render remove entity button", () => {
		render(<TestWrapper />);

		expect(screen.getByTestId("remove-entity-button")).toBeInTheDocument();
	});

	it("should render Fields label", () => {
		render(<TestWrapper />);

		expect(screen.getByText("Fields")).toBeInTheDocument();
	});

	it("should render add field button", () => {
		render(<TestWrapper />);

		expect(screen.getByTestId("add-field-button")).toBeInTheDocument();
	});

	it("should render existing fields", () => {
		render(<TestWrapper />);

		const textInputs = screen.getAllByTestId(
			/text-input-entity [0-9] key [0-9]/,
		);
		const valueTypeSelectors = screen.getAllByTestId("value-type-selector");

		// Should have 2 field keys (name, email)
		expect(textInputs).toHaveLength(2);
		expect(valueTypeSelectors).toHaveLength(2);
	});

	it("should render field values correctly", () => {
		render(<TestWrapper />);

		const textInputs = screen.getAllByTestId(
			/text-input-entity [0-9] key [0-9]/,
		);

		expect(textInputs[0]).toHaveValue("name");
		expect(textInputs[1]).toHaveValue("email");
	});

	it("should render remove field buttons", () => {
		render(<TestWrapper />);

		expect(screen.getByTestId("remove-field-0")).toBeInTheDocument();
		expect(screen.getByTestId("remove-field-1")).toBeInTheDocument();
	});

	it("should disable remove field button when only one field exists", () => {
		const defaultValues: FormSchema = {
			schemas: [
				{
					entity: "User",
					numberOfRecords: 5,
					fields: [{ key: "name", type: "string" }],
				},
			],
		};

		render(<TestWrapper defaultValues={defaultValues} />);

		const removeButton = screen.getByTestId("remove-field-0");
		expect(removeButton).toBeDisabled();
	});

	it("should enable remove field button when multiple fields exist", () => {
		render(<TestWrapper />);

		const removeButton = screen.getByTestId("remove-field-0");
		expect(removeButton).not.toBeDisabled();
	});

	it("should add a new field when add button is clicked", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const addButton = screen.getByTestId("add-field-button");
		await user.click(addButton);

		// Should now have 3 fields
		const textInputs = screen.getAllByTestId(
			/text-input-entity [0-9] key [0-9]/,
		);
		expect(textInputs).toHaveLength(3);
	});

	it("should remove a field when remove button is clicked", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const removeButton = screen.getByTestId("remove-field-0");
		await user.click(removeButton);

		// Should now have 1 field (email remains)
		const textInputs = screen.getAllByTestId(
			/text-input-entity [0-9] key [0-9]/,
		);
		expect(textInputs).toHaveLength(1);
		expect(textInputs[0]).toHaveValue("email");
	});

	it("should show additional input for reference type", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const selectors = screen.getAllByTestId("value-type-selector");
		await user.selectOptions(selectors[0], "reference");

		// Should show an additional text input for reference value
		const textInputs = screen.getAllByTestId(
			/text-input-entity [0-9] key [0-9]/,
		);
		expect(textInputs).toHaveLength(3); // name, email, reference value
	});

	it("should show additional input for one-of type", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const selectors = screen.getAllByTestId("value-type-selector");
		await user.selectOptions(selectors[0], "one-of");

		// Should show an additional text input for one-of value
		const textInputs = screen.getAllByTestId(
			/text-input-entity [0-9] key [0-9]/,
		);
		expect(textInputs).toHaveLength(3); // name, email, one-of value
	});

	it("should show number input for string-array type", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const selectors = screen.getAllByTestId("value-type-selector");
		await user.selectOptions(selectors[1], "string-array");

		// Should show a number input for array length
		const numberInputs = screen.getAllByTestId("number-input");
		expect(numberInputs).toHaveLength(2); // numberOfRecords + array length
	});

	it("should show number input for number-array type", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const selectors = screen.getAllByTestId("value-type-selector");
		await user.selectOptions(selectors[1], "number-array");

		// Should show a number input for array length
		const numberInputs = screen.getAllByTestId("number-input");
		expect(numberInputs).toHaveLength(2); // numberOfRecords + array length
	});

	it("should show number input for string type", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const selectors = screen.getAllByTestId("value-type-selector");
		await user.selectOptions(selectors[1], "string");

		// Should show a number input for string length
		const numberInputs = screen.getAllByTestId("number-input");
		expect(numberInputs).toHaveLength(2); // numberOfRecords + string length
	});

	it("should show NestedFormItem for nested type", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const selectors = screen.getAllByTestId("value-type-selector");
		await user.selectOptions(selectors[0], "nested");

		// Should show nested form item
		expect(screen.getByTestId("nested-form-item-0-0")).toBeInTheDocument();
	});

	it("should update entity name when typing", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const entityInput = screen.getByTestId("text-input-Entity 1");
		await user.clear(entityInput);
		await user.type(entityInput, "Product");

		expect(entityInput).toHaveValue("Product");
	});

	it("should update number of records when typing", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const recordsInput = screen.getByTestId("number-input-Number of Records");
		await user.clear(recordsInput);
		await user.type(recordsInput, "10");

		expect(recordsInput).toHaveValue(10);
	});

	it("should update field key when typing", async () => {
		render(<TestWrapper />);
		const user = userEvent.setup();

		const textInputs = screen.getAllByTestId(
			/text-input-entity [0-9] key [0-9]/,
		);
		await user.clear(textInputs[0]);
		await user.type(textInputs[0], "username");

		expect(textInputs[0]).toHaveValue("username");
	});

	it("should render with correct index for entity label", () => {
		render(<TestWrapper index={2} />);

		expect(screen.getByText("Entity 3")).toBeInTheDocument();
	});

	it("should render placeholder for entity input", () => {
		render(<TestWrapper />);

		const entityInput = screen.getByTestId("text-input-Entity 1");
		expect(entityInput).toHaveAttribute("placeholder", "Enter entity name");
	});

	it("should render placeholder for field key input", () => {
		render(<TestWrapper />);

		const textInputs = screen.getAllByTestId(
			/text-input-entity [0-9] key [0-9]/,
		);
		expect(textInputs[0]).toHaveAttribute("placeholder", "e.g. name");
	});
});
