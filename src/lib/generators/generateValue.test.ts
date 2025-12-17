import { generateValue } from "./generateValue.ts";

describe("generateValue", () => {
	test("word type", () => {
		const result = generateValue("word");
		expect(typeof result).toBe("string");
	});

	test("number type", () => {
		const result = generateValue("number");
		expect(typeof result).toBe("number");
	});

	test("age type", () => {
		const result = generateValue("age");
		expect(typeof result).toBe("number");
		// Age should be between 1 and 100
		expect((result as number) >= 1 && (result as number) <= 100).toBe(true);
	});

	test("boolean type", () => {
		const result = generateValue("boolean");
		expect(typeof result).toBe("boolean");
	});

	test("email type", () => {
		const result = generateValue("email");
		expect(typeof result).toBe("string");
		// Check if it matches basic email pattern
		expect(result as string).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	});

	test("name type", () => {
		const result = generateValue("name");
		expect(typeof result).toBe("string");
		// Name should not be empty
		expect((result as string).length > 0).toBe(true);
	});

	test("state type", () => {
		const result = generateValue("state");
		expect(typeof result).toBe("string");
		expect((result as string).length > 0).toBe(true);
	});

	test("street type", () => {
		const result = generateValue("street");
		expect(typeof result).toBe("string");
		expect((result as string).length > 0).toBe(true);
	});

	test("city type", () => {
		const result = generateValue("city");
		expect(typeof result).toBe("string");
		expect((result as string).length > 0).toBe(true);
	});

	test("zip-code type", () => {
		const result = generateValue("zip-code");
		expect(typeof result).toBe("string");
		expect((result as string).length > 0).toBe(true);
	});

	test("country type", () => {
		const result = generateValue("country");
		expect(typeof result).toBe("string");
		expect((result as string).length > 0).toBe(true);
	});

	test("building-number type", () => {
		const result = generateValue("building-number");
		expect(typeof result).toBe("string");
		expect((result as string).length > 0).toBe(true);
	});
});
