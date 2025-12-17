import { generateArray } from "./generateArray.ts";

describe("generateArray", () => {
	test("generates string array with correct count", () => {
		const result = generateArray("string-array", 5);

		expect(result.length).toBe(5);
		expect(typeof result[0]).toBe("string");
	});

	test("generates number array with correct count", () => {
		const result = generateArray("number-array", 3);

		expect(result.length).toBe(3);
		expect(typeof result[0]).toBe("number");
	});

	test("returns empty array for invalid pattern", () => {
		// @ts-expect-error testing invalid input
		const result = generateArray("number-array", "invalid");

		expect(result).toEqual([]);
	});

	test("handles zero count string array", () => {
		const result = generateArray("string-array", 0);

		expect(result.length).toBe(0);
	});

	test("handles zero count number array", () => {
		const result = generateArray("number-array", 0);

		expect(result.length).toBe(0);
	});

	test("handles unrecognized array pattern", () => {
		// @ts-expect-error testing invalid pattern
		const result = generateArray("unknown-pattern", 4);

		expect(result).toEqual([]);
	});
});
