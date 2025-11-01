import { DummyDataSchema } from "./types.ts";

export const dummyDataSchemas: DummyDataSchema[] = [
  {
    entity: "User",
    fields: {
      name: "name",
      age: "age",
      email: "email",
      isActive: "boolean",
      sex: "|male,female,other",
    },
    amount: 3,
  },
  {
    entity: "Post",
    fields: {
      title: "word",
      content: "^30string",
      tags: "@5string-array",
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
      scores: "@3number-array",
    },
    amount: 5,
  },
];
