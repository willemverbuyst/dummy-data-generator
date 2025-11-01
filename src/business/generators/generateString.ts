import { faker } from "@faker-js/faker";
import { type DummyDataSchema } from "../types.ts";

export function generateString(schema: DummyDataSchema, field: string) {
  const pattern = schema.fields[field].substring(1);
  const match = pattern.match(/^(\d+)(string)$/);
  if (match) {
    const count = parseInt(match[1], 10);
    const generatedString = faker.lorem.words(count);
    return generatedString;
  }
  return null;
}
