import { describe, expect, test } from "vitest";
import { type DummyDataSchema } from "../types.ts";
import { generateRandomOption } from "./generateRandomOption.ts";

describe("generateRandomOption", () => {
  test("returns valid option from schema", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        color: "|red,blue,green,yellow",
      },
    };

    const result = generateRandomOption(schema, "color");
    const validOptions = ["red", "blue", "green", "yellow"];

    expect(result).not.toBeUndefined();
    expect(validOptions.includes(result)).toBe(true);
  });

  test("returns single option", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        status: "|active",
      },
    };

    const result = generateRandomOption(schema, "status");
    expect(result).toBe("active");
  });

  test("handles empty options", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        empty: "|",
      },
    };

    const result = generateRandomOption(schema, "empty");
    expect(result).toBe("");
  });

  test("returns different values over multiple calls", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        size: "|small,medium,large,extra-large",
      },
    };

    const results = new Set();
    for (let i = 0; i < 50; i++) {
      results.add(generateRandomOption(schema, "size"));
    }

    // With 50 calls and 4 options, we should get multiple different values
    expect(results.size > 1).toBe(true);
  });
});
