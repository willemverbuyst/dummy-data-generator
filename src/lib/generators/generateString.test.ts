import { generateString } from "./generateString.ts";

describe("generateString", () => {
	test("valid pattern with number and letters", () => {
		const result = generateString(5);
		expect(result).not.toBeNull();
		expect(typeof result).toBe("string");
		expect(result!.split(" ").length).toBe(5);
	});

	test("valid pattern with different count", () => {
		const result = generateString(3);
		expect(result).not.toBeNull();
		expect(typeof result).toBe("string");
		expect(result!.split(" ").length).toBe(3);
	});
});
