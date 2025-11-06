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
    if (!schema.entity || schema.amount <= 0) return undefined;
    console.log(`Generating data for entity: ${schema.entity}`);
    dummyData[`${schema.entity}s`] = [];

    for (let i = 0; i < schema.amount; i++) {
      const item: DummyDataItem = { id: crypto.randomUUID() };

      for (const { key, type, value } of schema.fields) {
        if (type === "reference" && typeof value === "string") {
          const refId = generateReference({
            entity: value,
            dummyData,
          });
          if (refId) {
            item[key] = refId;
          }
        } else if (type === "one-of" && typeof value === "string") {
          const randomOption = generateRandomOption(value);
          item[key] = randomOption;
        } else if (type === "long-string" && typeof value === "number") {
          const generatedString = generateString(value);
          if (generatedString) {
            item[key] = generatedString;
          }
        } else if (
          (type === "string-array" || type === "number-array") &&
          typeof value === "number"
        ) {
          const array = generateArray(type, value);
          item[key] = array;
        } else {
          const simpleValue = generateValue(type as FieldValueTypeSimple);
          item[key] = simpleValue;
        }
      }
      dummyData[`${schema.entity}s`]?.push(item);
    }
  });
  return dummyData;
}
