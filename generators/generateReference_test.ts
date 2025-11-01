import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import { DummyData, DummyDataSchema } from "../types.ts";
import { generateReference } from "./generateReference.ts";

Deno.test("generateReference - returns id from referenced entity", () => {
  const schema: DummyDataSchema = {
    entity: "Post",
    fields: {
      userId: "#User",
    },
    amount: 1,
  };

  const userData = new Map<string, number | string>([
    ["id", 1],
    ["name", "John Doe"],
  ]);

  const dummyData: DummyData = new Map([["Users", [userData]]]);

  const result = generateReference({
    schema,
    field: "userId",
    dummyData,
  });

  assertEquals(result, 1);
});

Deno.test(
  "generateReference - returns null when no referenced data exists",
  () => {
    const schema: DummyDataSchema = {
      entity: "Post",
      fields: {
        userId: "#User",
      },
      amount: 1,
    };

    const dummyData: DummyData = new Map([["Users", []]]);

    const result = generateReference({
      schema,
      field: "userId",
      dummyData,
    });

    assertEquals(result, null);
  }
);

Deno.test(
  "generateReference - returns null when referenced entity doesn't exist",
  () => {
    const schema: DummyDataSchema = {
      entity: "Post",
      fields: {
        userId: "#User",
      },
      amount: 1,
    };

    const dummyData: DummyData = new Map();

    const result = generateReference({
      schema,
      field: "userId",
      dummyData,
    });

    assertEquals(result, null);
  }
);

Deno.test(
  "generateReference - returns random id from multiple references",
  () => {
    const schema: DummyDataSchema = {
      entity: "Post",
      fields: {
        userId: "#User",
      },
      amount: 1,
    };

    const userData1 = new Map([["id", 1]]);
    const userData2 = new Map([["id", 2]]);
    const userData3 = new Map([["id", 3]]);

    const dummyData: DummyData = new Map([
      ["Users", [userData1, userData2, userData3]],
    ]);

    const result = generateReference({
      schema,
      field: "userId",
      dummyData,
    });

    assertExists(result);
    assertEquals(typeof result, "number");
    assertEquals([1, 2, 3].includes(result as number), true);
  }
);
