import { faker } from "@faker-js/faker";
import { type FieldValueTypeSimple } from "../types.ts";

export function generateValue(
  type: FieldValueTypeSimple,
): string | number | boolean | string[] {
  switch (type) {
    case "word":
      return faker.lorem.word();
    case "string":
      return faker.lorem.words(3);
    case "number":
    case "age":
      return faker.number.int({ min: 1, max: 100 });
    case "boolean":
      return faker.datatype.boolean();
    case "email":
      return faker.internet.email();
    case "name":
      return faker.person.fullName();
  }
}
