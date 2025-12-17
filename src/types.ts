export const fieldValueTypeSimple = [
	"word",
	"number",
	"boolean",
	"email",
	"name",
	"age",
	"state",
	"street",
	"city",
	"zip-code",
	"country",
	"building-number",
] as const;

export const fieldValueTypeComplex = [
	"reference",
	"one-of",
	"string",
	"string-array",
	"number-array",
	"nested",
] as const;

export const allFieldValueTypes = [
	...fieldValueTypeSimple,
	...fieldValueTypeComplex,
] as const;

export type FieldValueTypeSimple = (typeof fieldValueTypeSimple)[number];
export type FieldValueTypeComplex = (typeof fieldValueTypeComplex)[number];

export type Field = {
	key: string;
	type: FieldValueTypeSimple | FieldValueTypeComplex;
	value?: string | number | Field[];
};

export type DummyDataSchema = {
	entity: string;
	fields: Field[];
	numberOfRecords: number;
};

export type DummyDataNestedItem = Record<string, string | number | boolean>;

export type DummyDataItem = Record<
	string,
	string | number | boolean | string[] | number[] | DummyDataNestedItem
>;

export type DummyData = Record<string, DummyDataItem[]>;
