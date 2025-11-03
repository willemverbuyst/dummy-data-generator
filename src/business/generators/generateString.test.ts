import { describe, expect, test } from "vitest";
import { generateString } from "./generateString.ts";

describe("generateString", () => {
  test("valid pattern with number and letters", () => {
    const result = generateString("^5string");
    expect(result).not.toBeNull();
    expect(typeof result).toBe("string");
    expect(result!.split(" ").length).toBe(5);
  });

  test("valid pattern with different count", () => {
    const result = generateString("^3string");
    expect(result).not.toBeNull();
    expect(typeof result).toBe("string");
    expect(result!.split(" ").length).toBe(3);
  });

  test("invalid pattern without number", () => {
    const result = generateString("^string");
    expect(result).toBeNull();
  });

  test("invalid pattern with only numbers", () => {
    const result = generateString("^123");
    expect(result).toBeNull();
  });

  test("pattern with wrong key word", () => {
    const result = generateString("^2words");
    expect(result).toBeNull();
  });
});
