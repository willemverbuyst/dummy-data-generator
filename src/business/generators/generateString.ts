import { faker } from "@faker-js/faker";

export function generateString(field: string) {
  const pattern = field.substring(1);
  const match = pattern.match(/^(\d+)(string)$/);
  if (match) {
    const count = parseInt(match[1], 10);
    const generatedString = faker.lorem.words(count);
    return generatedString;
  }
  return null;
}
