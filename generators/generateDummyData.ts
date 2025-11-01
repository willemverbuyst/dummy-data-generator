import {
  DummyData,
  DummyDataItem,
  DummyDataSchema,
  FieldValueType,
} from "../types.ts";
import { generateRandomOption } from "./generateRandomOption.ts";
import { generateReference } from "./generateReference.ts";
import { generateValue } from "./generateValue.ts";

export function generateDummyData(schemas: DummyDataSchema[]) {
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
        } else if (schema.fields[field].startsWith("|")) {
          const randomOption = generateRandomOption(schema, field);
          item.set(field, randomOption);
        } else {
          item.set(
            field,
            generateValue(
              schema.fields[field] as Exclude<
                FieldValueType,
                `#${string}` | `|${string}`
              >
            )
          );
        }
      }
      dummyData.get(`${schema.entity}s`)?.push(item);
    }
  });
  return dummyData;
}
