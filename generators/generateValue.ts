import { faker } from "npm:@faker-js/faker";
import { FieldValueType } from "../types.ts";

export function generateValue(
  type: Exclude<FieldValueType, `#${string}`>
): string | number | boolean {
  switch (type) {
    case "string":
      return faker.lorem.words(3);
    case "number":
      return faker.number.int();
    case "boolean":
      return faker.datatype.boolean();
    case "email":
      return faker.internet.email();
    case "name":
      return faker.person.fullName();
    case "age":
      return faker.number.int({ min: 1, max: 100 });
  }
}
