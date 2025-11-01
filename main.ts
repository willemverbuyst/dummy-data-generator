import { faker } from "npm:@faker-js/faker";
import { dummyDataSchemas } from "./example_input.ts";
import {
  DummyData,
  DummyDataItem,
  DummyDataSchema,
  FieldValueType,
} from "./types.ts";

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
  const refData = dummyData.get(refEntity);

  if (refData && refData.length > 0) {
    const randomRef =
      refData[faker.number.int({ min: 0, max: refData.length - 1 })];
    return randomRef.get("id");
  } else {
    console.warn(
      `Warning: No data found for referenced entity ${field} in ${schema.entity}`
    );
    return null;
  }
}

function generateDummyData(schemas: DummyDataSchema[]) {
  const dummyData: DummyData = new Map<string, DummyDataItem[]>();
  schemas.forEach((schema) => {
    console.log(`Generating data for entity: ${schema.entity}`);
    dummyData.set(`${schema.entity}s`, []);

    for (let i = 0; i < schema.amount; i++) {
      const item: DummyDataItem = new Map<string, string | number | boolean>();
      item.set("id", crypto.randomUUID());

      for (const field in schema.fields) {
        if (schema.fields[field].startsWith("#")) {
          const refId = generateReference({
            schema,
            field,
            dummyData,
          });
          if (refId) {
            item.set(field, refId);
          }
        } else {
          item.set(
            field,
            generateValue(
              schema.fields[field] as Exclude<FieldValueType, `#${string}`>
            )
          );
        }
      }
      dummyData.get(`${schema.entity}s`)?.push(item);
    }
  });
  return dummyData;
}

function convertMapsToObjects(dummyData: DummyData) {
  const result: Record<string, Record<string, any>[]> = {};

  for (const [entityName, items] of dummyData) {
    result[entityName] = items.map((item) => {
      const obj: Record<string, any> = {};
      for (const [key, value] of item) {
        obj[key] = value;
      }
      return obj;
    });
  }

  return result;
}

const result = generateDummyData(dummyDataSchemas);
const objectResult = convertMapsToObjects(result);
await Deno.writeTextFile(
  "dummy-data.json",
  JSON.stringify(objectResult, null, 2)
);
