import {
  assertEquals,
  assertMatch,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import { generateValue } from "./generateValue.ts";

Deno.test("generateValue - word type", () => {
  const result = generateValue("word");
  assertEquals(typeof result, "string");
});

Deno.test("generateValue - string type", () => {
  const result = generateValue("string");
  assertEquals(typeof result, "string");
  // Should generate 3 words
  const words = (result as string).split(" ");
  assertEquals(words.length, 3);
});

Deno.test("generateValue - number type", () => {
  const result = generateValue("number");
  assertEquals(typeof result, "number");
});

Deno.test("generateValue - boolean type", () => {
  const result = generateValue("boolean");
  assertEquals(typeof result, "boolean");
});

Deno.test("generateValue - email type", () => {
  const result = generateValue("email");
  assertEquals(typeof result, "string");
  // Check if it matches basic email pattern
  assertMatch(result as string, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

Deno.test("generateValue - name type", () => {
  const result = generateValue("name");
  assertEquals(typeof result, "string");
  // Name should not be empty
  assertEquals((result as string).length > 0, true);
});

Deno.test("generateValue - age type", () => {
  const result = generateValue("age");
  assertEquals(typeof result, "number");
  // Age should be between 1 and 100
  assertEquals((result as number) >= 1 && (result as number) <= 100, true);
});
