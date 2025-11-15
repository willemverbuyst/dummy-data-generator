import { describe, expect, test } from "vitest";
import { type DummyDataSchema } from "../../types.ts";
import { generateDummyData } from "./generateDummyData.ts";

describe("generateDummyData", () => {
  test("should generate data for single entity", () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "User",
        numberOfRecords: 2,
        fields: [
          { key: "name", type: "string" },
          { key: "age", type: "number" },
          { key: "active", type: "boolean" },
        ],
      },
    ];

    const result = generateDummyData(schemas);

    expect(result.Users).toBeDefined();
    expect(result.Users?.length).toBe(2);

    const firstItem = result.Users?.[0];
    expect(firstItem?.id).toBeDefined();
    expect(firstItem?.name).toBeDefined();
    expect(firstItem?.age).toBeDefined();
    expect(firstItem?.active).toBeDefined();
  });

  test("should generate data for multiple entities", () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "User",
        numberOfRecords: 1,
        fields: [{ key: "name", type: "string" }],
      },
      {
        entity: "Post",
        numberOfRecords: 2,
        fields: [{ key: "title", type: "string" }],
      },
    ];

    const result = generateDummyData(schemas);

    expect(result.Users?.length).toBe(1);
    expect(result.Posts?.length).toBe(2);
  });

  test("should handle reference fields", () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "User",
        numberOfRecords: 1,
        fields: [{ key: "name", type: "string" }],
      },
      {
        entity: "Post",
        numberOfRecords: 1,
        fields: [
          { key: "title", type: "string" },
          { key: "userId", type: "reference", value: "User" },
        ],
      },
    ];

    const result = generateDummyData(schemas);

    const post = result?.Posts?.[0];
    expect(post?.userId).toBeDefined();
  });

  test("should generate unique IDs", () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "User",
        numberOfRecords: 3,
        fields: [{ key: "name", type: "string" }],
      },
    ];

    const result = generateDummyData(schemas);
    const users = result.Users!;

    const ids = users.map((user) => user.id);
    const uniqueIds = new Set(ids);

    expect(ids.length).toBe(uniqueIds.size);
  });

  test("should handle empty schemas", () => {
    const schemas: DummyDataSchema[] = [];

    const result = generateDummyData(schemas);

    expect(Object.keys(result).length).toBe(0);
  });

  test("should handle zero number of records", () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "User",
        numberOfRecords: 0,
        fields: [{ key: "name", type: "string" }],
      },
    ];

    const result = generateDummyData(schemas);

    expect(result.Users?.length).toBeUndefined();
  });

  test("should handle random option", () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "Tag",
        numberOfRecords: 3,
        fields: [{ key: "name", type: "one-of", value: "red,green,blue" }],
      },
    ];

    const result = generateDummyData(schemas);
    const tags = result.Tags!;

    tags.forEach((tag) => {
      const name = tag.name;
      expect(name).toBeDefined();
      expect(["red", "green", "blue"].includes(name as string)).toBe(true);
    });
  });

  test("should handle string fields", () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "Comment",
        numberOfRecords: 2,
        fields: [{ key: "content", type: "long-string", value: 5 }],
      },
    ];

    const result = generateDummyData(schemas);
    const comments = result.Comments!;

    comments.forEach((comment) => {
      const content = comment.content;
      expect(content).toBeDefined();
      expect(typeof content).toBe("string");
      expect((content as string).split(" ").length).toBe(5);
    });
  });

  test("should handle array fields", () => {
    const schemas: DummyDataSchema[] = [
      {
        entity: "Product",
        numberOfRecords: 2,
        fields: [
          { key: "tags", type: "string-array", value: 3 },
          { key: "items", type: "number-array", value: 2 },
        ],
      },
    ];

    const result = generateDummyData(schemas);
    const products = result.Products!;

    products.forEach((product) => {
      const tags = product.tags;
      const items = product.items;

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
