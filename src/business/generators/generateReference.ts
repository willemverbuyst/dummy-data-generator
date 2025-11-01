import { faker } from "@faker-js/faker";
import { type DummyData, type DummyDataSchema } from "../types.ts";

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
      `Warning: No data found for referenced entity ${field} in ${schema.entity}`,
    );
    return null;
  }
}
