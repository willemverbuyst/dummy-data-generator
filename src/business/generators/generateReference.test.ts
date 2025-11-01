import { describe, expect, test } from "vitest";
import { type DummyData, type DummyDataSchema } from "../types.ts";
import { generateReference } from "./generateReference.ts";

describe("generateReference", () => {
  test("returns id from referenced entity", () => {
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

    expect(result).toBe(1);
  });

  test("returns null when no referenced data exists", () => {
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

    expect(result).toBeNull();
  });

  test("returns null when referenced entity doesn't exist", () => {
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

    expect(result).toBeNull();
  });

  test("returns random id from multiple references", () => {
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

    expect(result).toBeDefined();
    expect(typeof result).toBe("number");
    expect([1, 2, 3].includes(result as number)).toBe(true);
  });
});
