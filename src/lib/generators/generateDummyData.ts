import {
  type DummyData,
  type DummyDataItem,
  type DummyDataSchema,
  type FieldValueTypeSimple,
} from "../../types.ts";
import { generateArray } from "./generateArray.ts";
import { generateRandomOption } from "./generateRandomOption.ts";
import { generateReference } from "./generateReference.ts";
import { generateString } from "./generateString.ts";
import { generateValue } from "./generateValue.ts";

export function generateDummyData(schemas: DummyDataSchema[]) {
  const dummyData: DummyData = {};
  schemas.forEach((schema) => {
    if (!schema.entity || schema.numberOfRecords <= 0) return undefined;
    const entityKey = `${schema.entity}s`;
    dummyData[entityKey] = [];

    for (let i = 0; i < schema.numberOfRecords; i++) {
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
          item[key] = generateRandomOption(value);
        } else if (type === "long-string" && typeof value === "number") {
          const generatedString = generateString(value);
          if (generatedString) {
            item[key] = generatedString;
          }
        } else if (
          (type === "string-array" || type === "number-array") &&
          typeof value === "number"
        ) {
          item[key] = generateArray(type, value);
        } else {
          item[key] = generateValue(type as FieldValueTypeSimple);
        }
      }
      dummyData[entityKey].push(item);
    }
  });
  return dummyData;
}
