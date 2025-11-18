import { faker } from "@faker-js/faker";
import { type FieldValueTypeSimple } from "../../types.ts";

export function generateValue(type: FieldValueTypeSimple) {
  switch (type) {
    case "word":
      return faker.lorem.word();
    case "number":
    case "age":
      return faker.number.int({ min: 1, max: 100 });
    case "boolean":
      return faker.datatype.boolean();
    case "email":
      return faker.internet.email();
    case "name":
      return faker.person.fullName();
    case "state":
      return faker.location.state();
    case "street":
      return faker.location.street();
    case "city":
      return faker.location.city();
    case "zip-code":
      return faker.location.zipCode();
    case "country":
      return faker.location.country();
    case "building-number":
      return faker.location.buildingNumber();
  }
}
