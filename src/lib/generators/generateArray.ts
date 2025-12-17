import { generateValue } from "./generateValue.ts";

export function generateArray(
	arrayPattern: "string-array" | "number-array",
	value: number,
) {
	if (arrayPattern === "string-array") {
		const stringArray: string[] = [];
		for (let j = 0; j < value; j++) {
			stringArray.push(generateValue("word") as string);
		}
		return stringArray;
	} else if (arrayPattern === "number-array") {
		const numberArray: number[] = [];
		for (let j = 0; j < value; j++) {
			numberArray.push(generateValue("number") as number);
		}
		return numberArray;
	}
	return [];
}
