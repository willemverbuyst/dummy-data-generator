import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { createData } from "./createData.ts";
import { DummyDataSchema } from "./types.ts";

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

Deno.test("createData - should create the correct amount of dummy data", () => {
  const result = createData(DUMMY_DATA_SCHEMAS);
  assertEquals(result.Users.length, 3);
  assertEquals(result.Posts.length, 4);
  assertEquals(result.Comments.length, 5);
});
