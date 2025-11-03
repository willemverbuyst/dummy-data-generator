import { describe, expect, test } from "vitest";
import { generateArray } from "./generateArray.ts";

describe("generateArray", () => {
  test("generates string array with correct count", () => {
    const result = generateArray("@5string-array");

    expect(result.length).toBe(5);
    expect(typeof result[0]).toBe("string");
  });
});

test("generates number array with correct count", () => {
  const result = generateArray("@3number-array");

  expect(result.length).toBe(3);
  expect(typeof result[0]).toBe("number");
});

test("returns empty array for invalid pattern", () => {
  const result = generateArray("number-array");

  expect(result).toEqual([]);
});

test("handles zero count string array", () => {
  const result = generateArray("@0string-array");

  expect(result.length).toBe(0);
});

test("handles zero count number array", () => {
  const result = generateArray("@0number-array");

  expect(result.length).toBe(0);
});
