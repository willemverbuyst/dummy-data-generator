export const fieldValueTypeSimple = {
  WORD: "word",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  EMAIL: "email",
  NAME: "name",
  AGE: "age",
} as const;

export type FieldValueTypeSimple =
  (typeof fieldValueTypeSimple)[keyof typeof fieldValueTypeSimple];

export type FieldValueTypeComplex =
  | `#${string}` // reference to another entity
  | `|${string}` // one of values from a list separated by ","
  | `^${number}string` // string with a specific number of words
  | `@${number}string-array` // array of strings with a specific number of elements
  | `@${number}number-array`; // array of numbers with a specific number of elements

export type FieldValueType = FieldValueTypeSimple | FieldValueTypeComplex;

export type DummyDataSchema = {
  entity: string;
  fields: [string, FieldValueType][];
  amount: number;
};

export type DummyDataItem = Record<
  string,
  string | number | boolean | string[] | number[]
>;

export type DummyData = Record<string, DummyDataItem[]>;
