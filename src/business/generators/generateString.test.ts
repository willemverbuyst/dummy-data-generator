import { describe, expect, test } from "vitest";
import { type DummyDataSchema } from "../types.ts";
import { generateString } from "./generateString.ts";

describe("generateString", () => {
  test("valid pattern with number and letters", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        testField: "^5string",
      },
    };

    const result = generateString(schema, "testField");
    expect(result).not.toBeNull();
    expect(typeof result).toBe("string");
    expect(result!.split(" ").length).toBe(5);
  });

  test("valid pattern with different count", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        testField: "^3string",
      },
    };

    const result = generateString(schema, "testField");
    expect(result).not.toBeNull();
    expect(typeof result).toBe("string");
    expect(result!.split(" ").length).toBe(3);
  });

  test("invalid pattern without number", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        // @ts-expect-error testing invalid pattern
        testField: "^string",
      },
    };

    const result = generateString(schema, "testField");
    expect(result).toBeNull();
  });

  test("invalid pattern with only numbers", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        // @ts-expect-error testing invalid pattern
        testField: "^123",
      },
    };

    const result = generateString(schema, "testField");
    expect(result).toBeNull();
  });

  test("pattern with wrong key word", () => {
    const schema: DummyDataSchema = {
      entity: "Item",
      amount: 1,
      fields: {
        // @ts-expect-error testing invalid pattern
        testField: "^2words",
      },
    };

    const result = generateString(schema, "testField");
    expect(result).toBeNull();
  });
});
