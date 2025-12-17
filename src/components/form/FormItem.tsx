import {
	Controller,
	useFieldArray,
	useFormContext,
	type UseFieldArrayRemove,
} from "react-hook-form";
import { FieldGroup, FieldLabel } from "../ui/field";
import { AddFieldButton } from "./buttons/AddFieldButton";
import { RemoveEntityButton } from "./buttons/RemoveEntityButton";
import { NumberInput } from "./inputs/NumberInput";
import { TextInput } from "./inputs/TextInput";
import { KeyValueFields } from "./KeyValueFields";

export function FormItem({
	index,
	schemaId,
	removeSchema,
	schemasLength,
}: {
	index: number;
	schemaId: string;
	removeSchema: UseFieldArrayRemove;
	schemasLength: number;
}) {
	const { control } = useFormContext();
	const {
		fields: keyValueFields,
		append: appendField,
		remove: removeField,
	} = useFieldArray({
		control,
		name: `schemas.${index}.fields`,
	});

	return (
		<FieldGroup key={schemaId} className="bg-background m-2 rounded-md p-4">
			<div className="flex w-full items-end gap-2">
				<Controller
					name={`schemas.${index}.entity`}
					control={control}
					render={({ field, fieldState }) => (
						<TextInput
							field={field}
							fieldState={fieldState}
							placeholder="Enter entity name"
							label={`Entity ${index + 1}`}
						/>
					)}
				/>
				<Controller
					name={`schemas.${index}.numberOfRecords`}
					control={control}
					render={({ field, fieldState }) => (
						<NumberInput
							field={field}
							fieldState={fieldState}
							label="Number of Records"
						/>
					)}
				/>
				<RemoveEntityButton
					remove={removeSchema}
					index={index}
					disabled={schemasLength === 1}
					title={`remove-entity-${index + 1}`}
				/>
			</div>

			<div className="flex w-full flex-col gap-2">
				<div className="flex w-full items-end justify-between">
					<FieldLabel>Fields</FieldLabel>
					<AddFieldButton
						append={appendField}
						title={`entity-${index + 1}-add-field`}
					/>
				</div>
				{keyValueFields.map((field, fieldIndex) => (
					<KeyValueFields
						key={field.id}
						index={index}
						fieldIndex={fieldIndex}
						field={field}
						keyValueFieldsLength={keyValueFields.length}
						removeField={removeField}
					/>
				))}
			</div>
		</FieldGroup>
	);
}
