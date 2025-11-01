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

Deno.test("generateDummyData - should handle random option", () => {
  const schemas: DummyDataSchema[] = [
    {
      entity: "Tag",
      amount: 3,
      fields: { name: "|red,green,blue" },
    },
  ];

  const result = generateDummyData(schemas);
  const tags = result.get("Tags")!;

  tags.forEach((tag) => {
    const name = tag.get("name");
    assertExists(name);
    assertEquals(["red", "green", "blue"].includes(name as string), true);
  });
});

Deno.test("generateDummyData - should handle string fields", () => {
  const schemas: DummyDataSchema[] = [
    {
      entity: "Comment",
      amount: 2,
      fields: {
        content: "^5string",
      },
    },
  ];

  const result = generateDummyData(schemas);
  const comments = result.get("Comments")!;

  comments.forEach((comment) => {
    const content = comment.get("content");
    assertExists(content);
    assertEquals(typeof content, "string");
    assertEquals((content as string).split(" ").length, 5);
  });
});

Deno.test("generateDummyData - should handle array fields", () => {
  const schemas: DummyDataSchema[] = [
    {
      entity: "Product",
      amount: 2,
      fields: {
        tags: "@3string-array",
        items: "@2number-array",
      },
    },
  ];

  const result = generateDummyData(schemas);
  const products = result.get("Products")!;

  products.forEach((product) => {
    const tags = product.get("tags");
    const items = product.get("items");

    // Validate items array
    assertExists(items);
    assertEquals(Array.isArray(items), true);
    assertEquals((items as number[]).length, 2);
    (items as number[]).forEach((item) => {
      assertEquals(typeof item, "number");
    });

    // Validate tags array
    assertExists(tags);
    assertEquals(Array.isArray(tags), true);
    assertEquals((tags as string[]).length, 3);
    (tags as string[]).forEach((tag) => {
      assertEquals(typeof tag, "string");
    });
  });
});
