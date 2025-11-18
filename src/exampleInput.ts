export const exampleInput = [
  {
    entity: "User",
    fields: [
      { key: "name", type: "name" },
      { key: "age", type: "age" },
      { key: "email", type: "email" },
      { key: "isActive", type: "boolean" },
      { key: "sex", type: "one-of", value: "male, female, other" },
      {
        key: "address",
        type: "nested",
        value: [
          { key: "street", type: "string" },
          { key: "city", type: "string" },
          { key: "zipCode", type: "string" },
        ],
      },
    ],
    numberOfRecords: 3,
  },
  {
    entity: "Post",
    fields: [
      { key: "title", type: "word" },
      { key: "content", type: "long-string", value: 30 },
      { key: "tags", type: "string-array", value: 5 },
      { key: "authorId", type: "reference", value: "User" },
      { key: "published", type: "boolean" },
    ],
    numberOfRecords: 4,
  },
  {
    entity: "Comment",
    fields: [
      { key: "content", type: "string" },
      { key: "postId", type: "reference", value: "Post" },
      { key: "authorId", type: "reference", value: "User" },
      { key: "scores", type: "number-array", value: 3 },
    ],
    numberOfRecords: 5,
  },
  {
    entity: "Note",
    fields: [
      { key: "scribble", type: "string" },
      { key: "authorId", type: "reference", value: "User" },
      { key: "commentId", type: "reference", value: "Comment" },
    ],
    numberOfRecords: 20,
  },
];
