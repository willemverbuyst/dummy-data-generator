import { type DummyData } from "../../types.ts";
import { generateReference } from "./generateReference.ts";

describe("generateReference", () => {
  test("returns id from referenced entity", () => {
    const dummyData: DummyData = {
      Users: [
        {
          id: 1,
          name: "John Doe",
        },
      ],
    };

    const result = generateReference({
      entity: "User",
      dummyData,
    });

    expect(result).toBe(1);
  });

  test("returns null when no referenced data exists", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const dummyData: DummyData = {
      Users: [],
    };

    const result = generateReference({
      entity: "User",
      dummyData,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Warning: No data found for referenced entity User",
    );
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });

  test("returns null when referenced entity doesn't exist", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const dummyData: DummyData = {};

    const result = generateReference({
      entity: "User",
      dummyData,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Warning: No data found for referenced entity User",
    );
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });

  test("returns random id from multiple references", () => {
    const dummyData: DummyData = {
      Users: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const result = generateReference({
      entity: "User",
      dummyData,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("number");
    expect([1, 2, 3].includes(result as number)).toBe(true);
  });
});
