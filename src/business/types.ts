export const fieldValueTypeSimple = [
  "word",
  "string",
  "number",
  "boolean",
  "email",
  "name",
  "age",
] as const;

export const fieldValueTypeComplex = [
  "reference",
  "one-of",
  "long-string",
  "string-array",
  "number-array",
] as const;

export type FieldValueTypeSimple = (typeof fieldValueTypeSimple)[number];

export type DummyDataSchema = {
  entity: string;
  fields: { key: string; type: string; value?: string | number }[];
  numberOfRecords: number;
};

export type DummyDataItem = Record<
  string,
  string | number | boolean | string[] | number[]
>;

export type DummyData = Record<string, DummyDataItem[]>;
