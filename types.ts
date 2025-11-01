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

export type DummyData = {
  [key: string]: { [key: string]: string | number | boolean }[];
};
