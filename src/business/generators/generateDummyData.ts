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
  const dummyData: DummyData = {};
  schemas.forEach((schema) => {
    console.log(`Generating data for entity: ${schema.entity}`);
    dummyData[`${schema.entity}s`] = [];

    for (let i = 0; i < schema.amount; i++) {
      const item: DummyDataItem = { id: crypto.randomUUID() };

      for (const { key, value } of schema.fields) {
        if (value.startsWith("#")) {
          const refId = generateReference({
            entity: value,
            dummyData,
          });
          if (refId) {
            item[key] = refId;
          }
        } else if (value.startsWith("|")) {
          const randomOption = generateRandomOption(value);
          item[key] = randomOption;
        } else if (value.startsWith("^")) {
          const generatedString = generateString(value);
          if (generatedString) {
            item[key] = generatedString;
          }
        } else if (value.startsWith("@")) {
          const array = generateArray(value);
          item[key] = array;
        } else {
          const simpleValue = generateValue(value as FieldValueTypeSimple);
          item[key] = simpleValue;
        }
      }
      dummyData[`${schema.entity}s`]?.push(item);
    }
  });
  return dummyData;
}
