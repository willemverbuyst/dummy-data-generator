import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import { DummyDataSchema } from "../types.ts";
import { generateRandomOption } from "./generateRandomOption.ts";

Deno.test("generateRandomOption - returns valid option from schema", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      color: "|red,blue,green,yellow",
    },
  };

  const result = generateRandomOption(schema, "color");
  const validOptions = ["red", "blue", "green", "yellow"];

  assertExists(result);
  assertEquals(validOptions.includes(result), true);
});

Deno.test("generateRandomOption - returns single option", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      status: "|active",
    },
  };

  const result = generateRandomOption(schema, "status");
  assertEquals(result, "active");
});

Deno.test("generateRandomOption - handles empty options", () => {
  const schema: DummyDataSchema = {
    entity: "Item",
    amount: 1,
    fields: {
      empty: "|",
    },
  };

  const result = generateRandomOption(schema, "empty");
  assertEquals(result, "");
});

Deno.test(
  "generateRandomOption - returns different values over multiple calls",
  () => {
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
    assertEquals(results.size > 1, true);
  }
);
