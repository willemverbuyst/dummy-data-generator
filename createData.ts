import { generateDummyData } from "./generators/generateDummyData.ts";
import { DummyDataSchema } from "./types.ts";
import { convertMapsToObjects } from "./utils/convertMapsToObjects.ts";

export function createData(dataSchemas: DummyDataSchema[]) {
  const result = generateDummyData(dataSchemas);
  const objectResult = convertMapsToObjects(result);

  return objectResult;
}
