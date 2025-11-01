import { describe, expect, test } from "vitest";
import { createData } from "./createData";
import { type DummyDataSchema } from "./types";

const DUMMY_DATA_SCHEMAS: DummyDataSchema[] = [
  {
    entity: "User",
    fields: {
      name: "name",
      age: "age",
      email: "email",
      isActive: "boolean",
    },
    amount: 3,
  },
  {
    entity: "Post",
    fields: {
      title: "string",
      content: "string",
      authorId: "#User",
      published: "boolean",
    },
    amount: 4,
  },
  {
    entity: "Comment",
    fields: {
      content: "string",
      postId: "#Post",
      authorId: "#User",
    },
    amount: 5,
  },
];

describe("createData", () => {
  test("should create the correct amount of dummy data", () => {
    const result = createData(DUMMY_DATA_SCHEMAS);
    expect(result.Users.length).toBe(3);
    expect(result.Posts.length).toBe(4);
    expect(result.Comments.length).toBe(5);
  });
});
