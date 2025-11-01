export type FieldValueType =
  | "string"
  | "number"
  | "boolean"
  | "email"
  | "name"
  | "age"
  | "array"
  | `#${string}`
  | `|${string}`;

export type DummyDataSchema = {
  entity: string;
  fields: { [key: string]: FieldValueType };
  amount: number;
};

export type DummyDataItem = Map<string, string | number | boolean | string[]>;

export type DummyData = Map<string, DummyDataItem[]>;
