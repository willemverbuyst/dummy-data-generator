import { faker } from "npm:@faker-js/faker";
import { DummyData, DummyDataSchema, FieldValueType } from "./types.ts";

const items: DummyDataSchema[] = [
  {
    entity: "User",
    fields: {
      name: "name",
      age: "age",
      email: "email",
      isActive: "boolean",
    },
    amount: 3,
  },
  {
    entity: "Product",
    fields: {
      name: "string",
      price: "number",
      inStock: "boolean",
      category: "#Category",
    },
    amount: 1,
  },
  {
    entity: "Post",
    fields: {
      title: "string",
      content: "string",
      author: "#User",
      published: "boolean",
    },
    amount: 2,
  },
];

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

export function generateReference({
  schema,
  field,
  dummyData,
}: {
  schema: DummyDataSchema;
  field: string;
  dummyData: DummyData;
}) {
  const refEntity = schema.fields[field].substring(1) + "s";
  const refData = dummyData[refEntity];

  if (refData && refData.length > 0) {
    const randomRef =
      refData[faker.number.int({ min: 0, max: refData.length - 1 })];
    return randomRef.id;
  } else {
    console.warn(
      `Warning: No data found for referenced entity ${field} in ${schema.entity}`
    );
    return null;
  }
}

function generateDummyData(schemas: DummyDataSchema[]) {
  const dummyData: DummyData = {};
  schemas.forEach((schema) => {
    console.log(`Generating data for entity: ${schema.entity}`);
    dummyData[`${schema.entity}s`] = [];

    for (let i = 0; i < schema.amount; i++) {
      const item: { [key: string]: string | boolean | number } = {};
      item.id = crypto.randomUUID();

      for (const field in schema.fields) {
        if (schema.fields[field].startsWith("#")) {
          const refId = generateReference({
            schema,
            field,
            dummyData,
          });
          if (refId !== null) {
            item[field] = refId;
          }
        } else {
          item[field] = generateValue(
            schema.fields[field] as Exclude<FieldValueType, `#${string}`>
          );
        }
      }
      dummyData[`${schema.entity}s`].push(item);
    }
  });
  return dummyData;
}

const result = generateDummyData(items);
console.log(result);
