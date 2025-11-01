export type FieldValueType =
  | "string"
  | "number"
  | "boolean"
  | "email"
  | "name"
  | "age"
  | `#${string}`;

export type DummyDataSchema = {
  entity: string;
  fields: { [key: string]: FieldValueType };
  amount: number;
};

export type DummyDataItem = Map<string, string | number | boolean>;

export type DummyData = Map<string, DummyDataItem[]>;
