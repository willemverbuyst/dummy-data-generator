import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import { DummyDataSchema } from "../types.ts";
import { generateDummyData } from "./generateDummyData.ts";

Deno.test("generateDummyData - should generate data for single entity", () => {
  const schemas: DummyDataSchema[] = [
    {
      entity: "User",
      amount: 2,
      fields: {
        name: "string",
        age: "number",
        active: "boolean",
      },
    },
  ];

  const result = generateDummyData(schemas);

  assertEquals(result.size, 1);
  assertExists(result.get("Users"));
  assertEquals(result.get("Users")?.length, 2);

  const firstItem = result.get("Users")?.[0];
  assertExists(firstItem?.get("id"));
  assertExists(firstItem?.get("name"));
  assertExists(firstItem?.get("age"));
  assertExists(firstItem?.get("active"));
});

Deno.test(
  "generateDummyData - should generate data for multiple entities",
  () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "User",
        amount: 1,
        fields: { name: "string" },
      },
      {
        entity: "Post",
        amount: 2,
        fields: { title: "string" },
      },
    ];

    const result = generateDummyData(schemas);

    assertEquals(result.size, 2);
    assertEquals(result.get("Users")?.length, 1);
    assertEquals(result.get("Posts")?.length, 2);
  }
);

Deno.test("generateDummyData - should handle reference fields", () => {
  const schemas: DummyDataSchema[] = [
    {
      entity: "User",
      amount: 1,
      fields: { name: "string" },
    },
    {
      entity: "Post",
      amount: 1,
      fields: {
        title: "string",
        userId: "#User",
      },
    },
  ];

  const result = generateDummyData(schemas);

  const post = result.get("Posts")?.[0];
  assertExists(post?.get("userId"));
});

Deno.test("generateDummyData - should generate unique IDs", () => {
  const schemas: DummyDataSchema[] = [
    {
      entity: "User",
      amount: 3,
      fields: { name: "string" },
    },
  ];

  const result = generateDummyData(schemas);
  const users = result.get("Users")!;

  const ids = users.map((user) => user.get("id"));
  const uniqueIds = new Set(ids);

  assertEquals(ids.length, uniqueIds.size);
});

Deno.test("generateDummyData - should handle empty schemas", () => {
  const schemas: DummyDataSchema[] = [];

  const result = generateDummyData(schemas);

  assertEquals(result.size, 0);
});

Deno.test("generateDummyData - should handle zero amount", () => {
  const schemas: DummyDataSchema[] = [
    {
      entity: "User",
      amount: 0,
      fields: { name: "string" },
    },
  ];

  const result = generateDummyData(schemas);

  assertEquals(result.get("Users")?.length, 0);
});
