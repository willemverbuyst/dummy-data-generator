import { generateDummyData } from "./generators/generateDummyData";
import { type DummyDataSchema } from "./types";
import { convertMapsToObjects } from "./utils/convertMapsToObjects";

export function createData(dataSchemas: DummyDataSchema[]) {
  const result = generateDummyData(dataSchemas);
  const objectResult = convertMapsToObjects(result);

  return objectResult;
}
