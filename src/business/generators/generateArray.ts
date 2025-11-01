import { type DummyDataSchema } from "../types.ts";
import { generateValue } from "./generateValue.ts";

export function generateArray(schema: DummyDataSchema, field: string) {
  const arrayPattern = schema.fields[field];
  const matchStringArray = arrayPattern.match(/^@(\d+)string-array$/);
  const matchNumberArray = arrayPattern.match(/^@(\d+)number-array$/);

  if (matchStringArray) {
    const count = parseInt(matchStringArray[1], 10);
    const stringArray: string[] = [];
    for (let j = 0; j < count; j++) {
      stringArray.push(generateValue("word") as string);
    }
    return stringArray;
  } else if (matchNumberArray) {
    const count = parseInt(matchNumberArray[1], 10);
    const numberArray: number[] = [];
    for (let j = 0; j < count; j++) {
      numberArray.push(generateValue("number") as number);
    }
    return numberArray;
  }
  return [];
}
