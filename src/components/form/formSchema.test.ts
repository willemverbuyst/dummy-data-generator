import { describe, expect, it } from "vitest";
import { formSchema } from "./formSchema";

describe("formSchema", () => {
  describe("duplicate entity validation", () => {
    it("should allow unique entity names", () => {
      const validData = {
        schemas: [
          {
            entity: "User",
            fields: [{ key: "name", type: "name" as const }],
            numberOfRecords: 1,
          },
          {
            entity: "Product",
            fields: [{ key: "title", type: "word" as const }],
            numberOfRecords: 1,
          },
        ],
      };

      const result = formSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject duplicate entity names", () => {
      const invalidData = {
        schemas: [
          {
            entity: "User",
            fields: [{ key: "name", type: "name" as const }],
            numberOfRecords: 1,
          },
          {
            entity: "User",
            fields: [{ key: "email", type: "email" as const }],
            numberOfRecords: 1,
          },
        ],
      };

      const result = formSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].message).toBe('Duplicate entity: "User"');
        expect(result.error.issues[0].path).toEqual(["schemas", 1, "entity"]);
      }
    });

    it("should report multiple duplicate entities", () => {
      const invalidData = {
        schemas: [
          {
            entity: "User",
            fields: [{ key: "name", type: "name" as const }],
            numberOfRecords: 1,
          },
          {
            entity: "User",
            fields: [{ key: "email", type: "email" as const }],
            numberOfRecords: 1,
          },
          {
            entity: "Product",
            fields: [{ key: "title", type: "word" as const }],
            numberOfRecords: 1,
          },
          {
            entity: "Product",
            fields: [{ key: "price", type: "number" as const }],
            numberOfRecords: 1,
          },
        ],
      };

      const result = formSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
        expect(result.error.issues[0].message).toBe('Duplicate entity: "User"');
        expect(result.error.issues[1].message).toBe(
          'Duplicate entity: "Product"',
        );
      }
    });
  });
});
