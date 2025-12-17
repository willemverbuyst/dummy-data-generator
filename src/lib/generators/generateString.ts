import { faker } from "@faker-js/faker";

export function generateString(value: number) {
	const generatedString = faker.lorem.words(value);
	return generatedString;
}
