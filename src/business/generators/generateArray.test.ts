import { describe, expect, test } from "vitest";
import { type DummyDataSchema } from "../types.ts";
import { generateArray } from "./generateArray.ts";

describe("generateArray", () => {
  test("generates string array with correct count", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        testField: "@5string-array",
      },
    };

    const result = generateArray(schema, "testField");

    expect(result.length).toBe(5);
    expect(typeof result[0]).toBe("string");
  });
});

test("generates number array with correct count", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      testField: "@3number-array",
    },
  };

  const result = generateArray(schema, "testField");

  expect(result.length).toBe(3);
  expect(typeof result[0]).toBe("number");
});

test("returns empty array for invalid pattern", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      // @ts-expect-error testing invalid pattern
      testField: "invalid-pattern",
    },
  };

  const result = generateArray(schema, "testField");

  expect(result).toEqual([]);
});

test("handles zero count string array", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      testField: "@0string-array",
    },
  };

  const result = generateArray(schema, "testField");

  expect(result.length).toBe(0);
});

test("handles zero count number array", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      testField: "@0number-array",
    },
  };

  const result = generateArray(schema, "testField");

  expect(result.length).toBe(0);
});
