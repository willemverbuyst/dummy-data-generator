export const exampleInput = [
  {
    entity: "User",
    fields: [
      { key: "name", value: "name" },
      { key: "age", value: "age" },
      { key: "email", value: "email" },
      { key: "isActive", value: "boolean" },
      { key: "sex", value: "|male,female,other" },
    ],
    amount: 3,
  },
  {
    entity: "Post",
    fields: [
      { key: "title", value: "word" },
      { key: "content", value: "^30string" },
      { key: "tags", value: "@5string-array" },
      { key: "authorId", value: "#User" },
      { key: "published", value: "boolean" },
    ],
    amount: 4,
  },
  {
    entity: "Comment",
    fields: [
      { key: "content", value: "string" },
      { key: "postId", value: "#Post" },
      { key: "authorId", value: "#User" },
      { key: "scores", value: "@3number-array" },
    ],
    amount: 5,
  },
];
