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
    if (!schema.entity || schema.numberOfRecords <= 0) return undefined;
    // console.log(`Generating data for entity: ${schema.entity}`);
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

// export async function generateDummyData(schemas: DummyDataSchema[]) {
//   const dummyData: DummyData = {};

//   // ⚡ Run all schemas concurrently
//   await Promise.all(
//     schemas.map(async (schema) => {
//       if (!schema.entity || schema.numberOfRecords <= 0) return;

//       // console.log(`Generating data for entity: ${schema.entity}`);
//       const entityKey = `${schema.entity}s`;
//       dummyData[entityKey] = [];

//       // Loop sequentially through records for each schema
//       // (you can parallelize this too, but it's memory heavy)
//       for (let i = 0; i < schema.numberOfRecords; i++) {
//         const item: DummyDataItem = { id: crypto.randomUUID() };

//         // ⚡ Run all field generations concurrently
//         await Promise.all(
//           schema.fields.map(async ({ key, type, value }) => {
//             if (type === "reference" && typeof value === "string") {
//               const refId = generateReference({ entity: value, dummyData });
//               if (refId) item[key] = refId;
//             } else if (type === "one-of" && typeof value === "string") {
//               item[key] = generateRandomOption(value);
//             } else if (type === "long-string" && typeof value === "number") {
//               const str = generateString(value);
//               if (str) item[key] = str;
//             } else if (
//               (type === "string-array" || type === "number-array") &&
//               typeof value === "number"
//             ) {
//               item[key] = generateArray(type, value);
//             } else {
//               item[key] = generateValue(type as FieldValueTypeSimple);
//             }
//           }),
//         );

//         dummyData[entityKey].push(item);
//       }
//     }),
//   );

//   return dummyData;
// }
