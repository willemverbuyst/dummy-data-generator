import { describe, expect, test } from "vitest";
import { type DummyData } from "../types.ts";
import { convertMapsToObjects } from "./convertMapsToObjects.ts";

describe("convertMapsToObjects", () => {
  test("empty map", () => {
    const dummyData: DummyData = new Map();
    const result = convertMapsToObjects(dummyData);
    expect(result).toEqual({});
  });

  test("single entity with single item", () => {
    const item = new Map<string, number | string>([
      ["id", 1],
      ["name", "test"],
    ]);
    const dummyData: DummyData = new Map([["users", [item]]]);

    const result = convertMapsToObjects(dummyData);
    expect(result).toEqual({
      users: [{ id: 1, name: "test" }],
    });
  });

  test("single entity with multiple items", () => {
    const item1 = new Map<string, number | string>([
      ["id", 1],
      ["name", "Alice"],
    ]);
    const item2 = new Map<string, number | string>([
      ["id", 2],
      ["name", "Bob"],
    ]);
    const dummyData: DummyData = new Map([["users", [item1, item2]]]);

    const result = convertMapsToObjects(dummyData);
    expect(result).toEqual({
      users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
    });
  });

  test("multiple entities", () => {
    const user = new Map<string, number | string>([
      ["id", 1],
      ["name", "Alice"],
    ]);
    const product = new Map<string, number | string>([
      ["id", 100],
      ["title", "Product A"],
      ["price", 29.99],
    ]);
    const dummyData: DummyData = new Map([
      ["users", [user]],
      ["products", [product]],
    ]);

    const result = convertMapsToObjects(dummyData);
    expect(result).toEqual({
      users: [{ id: 1, name: "Alice" }],
      products: [{ id: 100, title: "Product A", price: 29.99 }],
    });
  });

  test("entity with empty items array", () => {
    const dummyData: DummyData = new Map([["users", []]]);

    const result = convertMapsToObjects(dummyData);
    expect(result).toEqual({
      users: [],
    });
  });

  test("handles various data types", () => {
    const item = new Map<string, number | string | boolean>([
      ["string", "text"],
      ["number", 42],
      ["boolean", true],
    ]);
    const dummyData: DummyData = new Map([["mixed", [item]]]);

    const result = convertMapsToObjects(dummyData);
    expect(result).toEqual({
      mixed: [
        {
          string: "text",
          number: 42,
          boolean: true,
        },
      ],
    });
  });
});
