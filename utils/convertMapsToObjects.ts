import { DummyData } from "../types.ts";

export function convertMapsToObjects(dummyData: DummyData) {
  const result: Record<string, Record<string, unknown>[]> = {};

  for (const [entityName, items] of dummyData) {
    result[entityName] = items.map((item) => {
      const obj: Record<string, unknown> = {};
      for (const [key, value] of item) {
        obj[key] = value;
      }
      return obj;
    });
  }

  return result;
}
