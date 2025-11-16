import { generateRandomOption } from "./generateRandomOption.ts";

describe("generateRandomOption", () => {
  test("returns valid option from schema", () => {
    const result = generateRandomOption("red,blue,green,yellow");
    const validOptions = ["red", "blue", "green", "yellow"];

    expect(result).not.toBeUndefined();
    expect(validOptions.includes(result)).toBe(true);
  });

  test("returns valid option when separated by spaces", () => {
    const result = generateRandomOption("red blue green yellow");
    const validOptions = ["red", "blue", "green", "yellow"];

    expect(result).not.toBeUndefined();
    expect(validOptions.includes(result)).toBe(true);
  });

  test("returns valid option when separated by a pipe", () => {
    const result = generateRandomOption("red|blue|green|yellow");
    const validOptions = ["red", "blue", "green", "yellow"];

    expect(result).not.toBeUndefined();
    expect(validOptions.includes(result)).toBe(true);
  });

  test("returns valid option when separated by commas and spaces", () => {
    const result = generateRandomOption("red, blue, green, yellow");
    const validOptions = ["red", "blue", "green", "yellow"];

    expect(result).not.toBeUndefined();
    expect(validOptions.includes(result)).toBe(true);
  });

  test("returns single option", () => {
    const result = generateRandomOption("active");
    expect(result).toBe("active");
  });

  test("handles empty options", () => {
    const result = generateRandomOption("");
    expect(result).toBeUndefined();
  });

  test("returns different values over multiple calls", () => {
    const results = new Set();
    for (let i = 0; i < 50; i++) {
      results.add(generateRandomOption("small,medium,large,extra-large"));
    }

    // With 50 calls and 4 options, we should get multiple different values
    expect(results.size > 1).toBe(true);
  });
});
