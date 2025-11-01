import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { DummyDataSchema } from "../types.ts";
import { generateArray } from "./generateArray.ts";

Deno.test("generateArray - generates string array with correct count", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      testField: "@5string-array",
    },
  };

  const result = generateArray(schema, "testField");

  assertEquals(result.length, 5);
  assertEquals(typeof result[0], "string");
});

Deno.test("generateArray - generates number array with correct count", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      testField: "@3number-array",
    },
  };

  const result = generateArray(schema, "testField");

  assertEquals(result.length, 3);
  assertEquals(typeof result[0], "number");
});

Deno.test("generateArray - returns empty array for invalid pattern", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      // @ts-expect-error testing invalid pattern
      testField: "invalid-pattern",
    },
  };

  const result = generateArray(schema, "testField");

  assertEquals(result, []);
});

Deno.test("generateArray - handles zero count string array", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      testField: "@0string-array",
    },
  };

  const result = generateArray(schema, "testField");

  assertEquals(result.length, 0);
});

Deno.test("generateArray - handles zero count number array", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      testField: "@0number-array",
    },
  };

  const result = generateArray(schema, "testField");

  assertEquals(result.length, 0);
});
