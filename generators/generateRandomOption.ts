import { DummyDataSchema } from "../types.ts";

export function generateRandomOption(
  schema: DummyDataSchema,
  field: string
): string {
  const optionsString = schema.fields[field].substring(1);
  const options = optionsString.split(",");
  const randomOption = options[Math.floor(Math.random() * options.length)];
  return randomOption;
}
