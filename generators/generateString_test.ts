import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { assertNotEquals } from "https://deno.land/std@0.208.0/assert/assert_not_equals.ts";
import { DummyDataSchema } from "../types.ts";
import { generateString } from "./generateString.ts";

Deno.test("generateString - valid pattern with number and letters", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      testField: "^5string",
    },
  };

  const result = generateString(schema, "testField");
  assertNotEquals(result, null);
  assertEquals(typeof result, "string");
  assertEquals(result!.split(" ").length, 5);
});

Deno.test("generateString - valid pattern with different count", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      testField: "^3string",
    },
  };

  const result = generateString(schema, "testField");
  assertNotEquals(result, null);
  assertEquals(typeof result, "string");
  assertEquals(result!.split(" ").length, 3);
});

Deno.test("generateString - invalid pattern without number", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      // @ts-expect-error testing invalid pattern
      testField: "^string",
    },
  };

  const result = generateString(schema, "testField");
  assertEquals(result, null);
});

Deno.test("generateString - invalid pattern with only numbers", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      // @ts-expect-error testing invalid pattern
      testField: "^123",
    },
  };

  const result = generateString(schema, "testField");
  assertEquals(result, null);
});

Deno.test("generateString - pattern with wrong key word", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      // @ts-expect-error testing invalid pattern
      testField: "^2words",
    },
  };

  const result = generateString(schema, "testField");
  assertEquals(result, null);
});
