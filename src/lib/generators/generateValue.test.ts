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

  test("age type", () => {
    const result = generateValue("age");
    expect(typeof result).toBe("number");
    // Age should be between 1 and 100
    expect((result as number) >= 1 && (result as number) <= 100).toBe(true);
  });
});
