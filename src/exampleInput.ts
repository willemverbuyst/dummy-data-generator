import type { DummyDataSchema } from "./types";

export const exampleInput: DummyDataSchema[] = [
	{
		entity: "User",
		fields: [
			{ key: "name", type: "name" },
			{ key: "email", type: "email" },
			{
				key: "address",
				type: "nested",
				value: [
					{ key: "street", type: "street" },
					{ key: "city", type: "city" },
					{ key: "zipCode", type: "zip-code" },
					{ key: "country", type: "country" },
					{ key: "state", type: "state" },
					{ key: "buildingNumber", type: "building-number" },
				],
			},
			{ key: "age", type: "age" },
			{ key: "isActive", type: "boolean" },
			{ key: "sex", type: "one-of", value: "male, female, other" },
		],
		numberOfRecords: 3,
	},
	{
		entity: "Post",
		fields: [
			{ key: "title", type: "word" },
			{ key: "content", type: "string", value: 30 },
			{ key: "tags", type: "string-array", value: 5 },
			{ key: "authorId", type: "reference", value: "User" },
			{ key: "published", type: "boolean" },
		],
		numberOfRecords: 4,
	},
	{
		entity: "Comment",
		fields: [
			{ key: "content", type: "string", value: 3 },
			{ key: "postId", type: "reference", value: "Post" },
			{ key: "authorId", type: "reference", value: "User" },
			{ key: "scores", type: "number-array", value: 3 },
		],
		numberOfRecords: 5,
	},
	{
		entity: "Note",
		fields: [
			{ key: "scribble", type: "string", value: 5 },
			{ key: "authorId", type: "reference", value: "User" },
			{ key: "commentId", type: "reference", value: "Comment" },
		],
		numberOfRecords: 20,
	},
];
