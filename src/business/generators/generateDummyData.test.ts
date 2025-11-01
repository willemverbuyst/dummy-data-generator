import { describe, expect, test } from "vitest";
import { type DummyDataSchema } from "../types.ts";
import { generateDummyData } from "./generateDummyData.ts";

describe("generateDummyData", () => {
  test("should generate data for single entity", () => {
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

    expect(result.size).toBe(1);
    expect(result.get("Users")).toBeDefined();
    expect(result.get("Users")?.length).toBe(2);

    const firstItem = result.get("Users")?.[0];
    expect(firstItem?.get("id")).toBeDefined();
    expect(firstItem?.get("name")).toBeDefined();
    expect(firstItem?.get("age")).toBeDefined();
    expect(firstItem?.get("active")).toBeDefined();
  });

  test("should generate data for multiple entities", () => {
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

    expect(result.size).toBe(2);
    expect(result.get("Users")?.length).toBe(1);
    expect(result.get("Posts")?.length).toBe(2);
  });

  test("should handle reference fields", () => {
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
    expect(post?.get("userId")).toBeDefined();
  });

  test("should generate unique IDs", () => {
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

    expect(ids.length).toBe(uniqueIds.size);
  });

  test("should handle empty schemas", () => {
    const schemas: DummyDataSchema[] = [];

    const result = generateDummyData(schemas);

    expect(result.size).toBe(0);
  });

  test("should handle zero amount", () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "User",
        amount: 0,
        fields: { name: "string" },
      },
    ];

    const result = generateDummyData(schemas);

    expect(result.get("Users")?.length).toBe(0);
  });

  test("should handle random option", () => {
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
      expect(name).toBeDefined();
      expect(["red", "green", "blue"].includes(name as string)).toBe(true);
    });
  });

  test("should handle string fields", () => {
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
      expect(content).toBeDefined();
      expect(typeof content).toBe("string");
      expect((content as string).split(" ").length).toBe(5);
    });
  });

  test("should handle array fields", () => {
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
      expect(items).toBeDefined();
      expect(Array.isArray(items)).toBe(true);
      expect((items as number[]).length).toBe(2);
      (items as number[]).forEach((item) => {
        expect(typeof item).toBe("number");
      });

      // Validate tags array
      expect(tags).toBeDefined();
      expect(Array.isArray(tags)).toBe(true);
      expect((tags as string[]).length).toBe(3);
      (tags as string[]).forEach((tag) => {
        expect(typeof tag).toBe("string");
      });
    });
  });
});
