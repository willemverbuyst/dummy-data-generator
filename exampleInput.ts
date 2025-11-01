import { DummyDataSchema } from "./types.ts";

export const dummyDataSchemas: DummyDataSchema[] = [
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
