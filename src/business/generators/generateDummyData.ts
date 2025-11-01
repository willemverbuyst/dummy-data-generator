import {
  type DummyData,
  type DummyDataItem,
  type DummyDataSchema,
  type FieldValueTypeSimple,
} from "../types.ts";
import { generateArray } from "./generateArray.ts";
import { generateRandomOption } from "./generateRandomOption.ts";
import { generateReference } from "./generateReference.ts";
import { generateString } from "./generateString.ts";
import { generateValue } from "./generateValue.ts";

export function generateDummyData(schemas: DummyDataSchema[]) {
  const dummyData: DummyData = new Map<string, DummyDataItem[]>();
  schemas.forEach((schema) => {
    console.log(`Generating data for entity: ${schema.entity}`);
    dummyData.set(`${schema.entity}s`, []);

    for (let i = 0; i < schema.amount; i++) {
      const item: DummyDataItem = new Map();
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
        } else if (schema.fields[field].startsWith("|")) {
          const randomOption = generateRandomOption(schema, field);
          item.set(field, randomOption);
        } else if (schema.fields[field].startsWith("^")) {
          const generatedString = generateString(schema, field);
          if (generatedString) {
            item.set(field, generatedString);
          }
        } else if (schema.fields[field].startsWith("@")) {
          const array = generateArray(schema, field);
          item.set(field, array);
        } else {
          const value = generateValue(
            schema.fields[field] as FieldValueTypeSimple,
          );

          item.set(field, value);
        }
      }
      dummyData.get(`${schema.entity}s`)?.push(item);
    }
  });
  return dummyData;
}
