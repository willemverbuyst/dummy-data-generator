import App from "@/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  findByRoleClickClearType,
  findByRoleClickClearTypeTabSelect,
  findByRoleClickClearTypeTabSelectType,
  findByRoleClickClearTypeTabType,
} from "./test-utils";

describe("Full Flow Integration Test", () => {
  it("should fill the form with example data, generate output, and validate structure and references", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for app to be ready
    const initialBadge = await screen.findByText("in sync");
    expect(initialBadge).toBeInTheDocument();

    const addEntityButton = await screen.findByRole("button", {
      name: /add entity/i,
    });
    const generateButton = screen.getByRole("button", { name: /generate/i });

    // ============================================================================
    // PART 1: FILL THE FORM WITH EXAMPLE DATA
    // ============================================================================

    // ----------------------------------------------------------------------------
    // Entity 1: User (3 records)
    // ----------------------------------------------------------------------------
    await findByRoleClickClearType(user, "textbox", /^entity 1$/i, "User");
    await findByRoleClickClearType(user, "textbox", /number of records/i, "3");

    await findByRoleClickClearTypeTabSelect(
      user,
      "textbox",
      /^entity 1 key 1$/i,
      "name",
      "name",
    );

    const entity1AddFieldButton =
      await screen.findByTitle("entity-1-add-field");
    await user.click(entity1AddFieldButton);

    await findByRoleClickClearTypeTabSelect(
      user,
      "textbox",
      /^entity 1 key 2$/i,
      "email",
      "email",
    );

    await user.click(entity1AddFieldButton);

    await findByRoleClickClearTypeTabSelect(
      user,
      "textbox",
      /^entity 1 key 3$/i,
      "address",
      "nested",
    );

    const entity1Field3AddNestedFieldButton = await screen.findByTitle(
      "entity-1-field-3-add-nested-field",
    );

    // nested fields within address
    for (const [key, value, index] of [
      ["street", "street", 1],
      ["city", "city", 2],
      ["zipCode", "zip code", 3],
      ["country", "country", 4],
      ["state", "state", 5],
      ["buildingNumber", "building number", 6],
    ] as const) {
      await user.click(entity1Field3AddNestedFieldButton);
      await findByRoleClickClearTypeTabSelect(
        user,
        "textbox",
        `Entity 1 Key 3 Nested Key ${index}`,
        key,
        value,
      );
    }

    await user.click(entity1AddFieldButton);

    await findByRoleClickClearTypeTabSelect(
      user,
      "textbox",
      /^entity 1 key 4$/i,
      "age",
      "age",
    );

    await user.click(entity1AddFieldButton);

    await findByRoleClickClearTypeTabSelect(
      user,
      "textbox",
      /^entity 1 key 5$/i,
      "isActive",
      "boolean",
    );

    await user.click(entity1AddFieldButton);

    await findByRoleClickClearTypeTabSelectType(
      user,
      "textbox",
      /^entity 1 key 6$/i,
      "sex",
      "one of",
      "male, female, other",
    );

    // ----------------------------------------------------------------------------
    // Entity 2: Post (4 records)
    // ----------------------------------------------------------------------------
    await user.click(addEntityButton);

    await findByRoleClickClearTypeTabType(
      user,
      "textbox",
      /^entity 2$/i,
      "Post",
      "4",
    );

    await findByRoleClickClearTypeTabSelect(
      user,
      "textbox",
      /^entity 2 key 1$/i,
      "title",
      "word",
    );

    const entity2AddFieldButton =
      await screen.findByTitle("entity-2-add-field");
    await user.click(entity2AddFieldButton);

    await findByRoleClickClearTypeTabSelectType(
      user,
      "textbox",
      /^entity 2 key 2$/i,
      "content",
      "string",
      "30",
    );

    await user.click(entity2AddFieldButton);

    await findByRoleClickClearTypeTabSelectType(
      user,
      "textbox",
      /^entity 2 key 3$/i,
      "tags",
      "string array",
      "5",
    );

    await user.click(entity2AddFieldButton);

    await findByRoleClickClearTypeTabSelectType(
      user,
      "textbox",
      /^entity 2 key 4$/i,
      "authorId",
      "reference",
      "User",
    );

    await user.click(entity2AddFieldButton);

    await findByRoleClickClearTypeTabSelect(
      user,
      "textbox",
      /^entity 2 key 5$/i,
      "published",
      "boolean",
    );

    // ----------------------------------------------------------------------------
    // Entity 3: Comment (5 records)
    // ----------------------------------------------------------------------------
    await user.click(addEntityButton);

    await findByRoleClickClearTypeTabType(
      user,
      "textbox",
      /^entity 3$/i,
      "Comment",
      "5",
    );

    await findByRoleClickClearTypeTabSelectType(
      user,
      "textbox",
      /^entity 3 key 1$/i,
      "content",
      "string",
      "3",
    );

    const entity3AddFieldButton =
      await screen.findByTitle("entity-3-add-field");

    await user.click(entity3AddFieldButton);

    await findByRoleClickClearTypeTabSelectType(
      user,
      "textbox",
      /^entity 3 key 2$/i,
      "postId",
      "reference",
      "Post",
    );

    await user.click(entity3AddFieldButton);

    await findByRoleClickClearTypeTabSelectType(
      user,
      "textbox",
      /^entity 3 key 3$/i,
      "authorId",
      "reference",
      "User",
    );

    await user.click(entity3AddFieldButton);

    await findByRoleClickClearTypeTabSelectType(
      user,
      "textbox",
      /^entity 3 key 4$/i,
      "scores",
      "number array",
      "3",
    );

    // ============================================================================
    // GENERATE DATA
    // ============================================================================

    await user.click(generateButton);
    await waitFor(
      () => {
        expect(screen.getByText("in sync")).toBeInTheDocument();
      },
      { timeout: 30_000 },
    );

    // ============================================================================
    // PART 2: VALIDATE THE OUTPUT
    // ============================================================================
    const preElement = screen.getByRole("code");
    const jsonText = preElement.textContent;
    expect(jsonText).toBeTruthy();

    const output = JSON.parse(jsonText!);

    // ----------------------------------------------------------------------------
    // Validate Entity Structure
    // ----------------------------------------------------------------------------
    expect(output).toHaveProperty("Users");
    expect(output).toHaveProperty("Posts");
    expect(output).toHaveProperty("Comments");

    // ----------------------------------------------------------------------------
    // Validate Record Counts
    // ----------------------------------------------------------------------------
    expect(output.Users).toHaveLength(3);
    expect(output.Posts).toHaveLength(4);
    expect(output.Comments).toHaveLength(5);

    // ----------------------------------------------------------------------------
    // Validate User Structure and Types
    // ----------------------------------------------------------------------------
    const firstUser = output.Users[0];
    expect(firstUser).toHaveProperty("id");
    expect(firstUser.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(firstUser).toHaveProperty("name");
    expect(typeof firstUser.name).toBe("string");
    expect(firstUser).toHaveProperty("email");
    expect(typeof firstUser.email).toBe("string");
    expect(firstUser).toHaveProperty("address");
    expect(typeof firstUser.address).toBe("object");
    expect(firstUser.address).toHaveProperty("street");
    expect(firstUser.address).toHaveProperty("city");
    expect(firstUser.address).toHaveProperty("zipCode");
    expect(firstUser.address).toHaveProperty("country");
    expect(firstUser.address).toHaveProperty("state");
    expect(firstUser.address).toHaveProperty("buildingNumber");
    expect(firstUser).toHaveProperty("age");
    expect(typeof firstUser.age).toBe("number");
    expect(firstUser).toHaveProperty("isActive");
    expect(typeof firstUser.isActive).toBe("boolean");
    expect(firstUser).toHaveProperty("sex");
    expect(["male", "female", "other"]).toContain(firstUser.sex);

    // ----------------------------------------------------------------------------
    // Validate Post Structure and Types
    // ----------------------------------------------------------------------------
    const firstPost = output.Posts[0];
    expect(firstPost).toHaveProperty("id");
    expect(firstPost.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(firstPost).toHaveProperty("title");
    expect(typeof firstPost.title).toBe("string");
    expect(firstPost).toHaveProperty("content");
    expect(typeof firstPost.content).toBe("string");
    expect(firstPost.content.length).toBeGreaterThan(0);
    expect(firstPost).toHaveProperty("tags");
    expect(Array.isArray(firstPost.tags)).toBe(true);
    expect(firstPost.tags).toHaveLength(5);
    expect(typeof firstPost.tags[0]).toBe("string");
    expect(firstPost).toHaveProperty("authorId");
    expect(typeof firstPost.authorId).toBe("string");
    expect(firstPost).toHaveProperty("published");
    expect(typeof firstPost.published).toBe("boolean");

    // ----------------------------------------------------------------------------
    // Validate Comment Structure and Types
    // ----------------------------------------------------------------------------
    const firstComment = output.Comments[0];
    expect(firstComment).toHaveProperty("id");
    expect(firstComment.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(firstComment).toHaveProperty("content");
    expect(typeof firstComment.content).toBe("string");
    expect(firstComment).toHaveProperty("postId");
    expect(typeof firstComment.postId).toBe("string");
    expect(firstComment).toHaveProperty("authorId");
    expect(typeof firstComment.authorId).toBe("string");
    expect(firstComment).toHaveProperty("scores");
    expect(Array.isArray(firstComment.scores)).toBe(true);
    expect(firstComment.scores).toHaveLength(3);
    expect(typeof firstComment.scores[0]).toBe("number");

    // ----------------------------------------------------------------------------
    // Validate UUID References - Critical Test
    // ----------------------------------------------------------------------------
    const userIds = output.Users.map((user: { id: string }) => user.id);
    expect(userIds).toHaveLength(3);

    const postIds = output.Posts.map((post: { id: string }) => post.id);
    expect(postIds).toHaveLength(4);

    const commentIds = output.Comments.map(
      (comment: { id: string }) => comment.id,
    );
    expect(commentIds).toHaveLength(5);

    // Validate Post.authorId references exist in Users
    output.Posts.forEach((post: { authorId: string }, index: number) => {
      expect(
        userIds,
        `Post[${index}].authorId should reference a valid User`,
      ).toContain(post.authorId);
    });

    // Validate Comment.authorId references exist in Users
    output.Comments.forEach((comment: { authorId: string }, index: number) => {
      expect(
        userIds,
        `Comment[${index}].authorId should reference a valid User`,
      ).toContain(comment.authorId);
    });

    // Validate Comment.postId references exist in Posts
    output.Comments.forEach((comment: { postId: string }, index: number) => {
      expect(
        postIds,
        `Comment[${index}].postId should reference a valid Post`,
      ).toContain(comment.postId);
    });

    // ----------------------------------------------------------------------------
    // Additional Validations
    // ----------------------------------------------------------------------------

    // Verify all entities have unique IDs
    const allIds = [
      ...output.Users.map((u: { id: string }) => u.id),
      ...output.Posts.map((p: { id: string }) => p.id),
      ...output.Comments.map((c: { id: string }) => c.id),
    ];
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);

    // Verify nested address structure for all users
    output.Users.forEach((user: { address: object }, index: number) => {
      expect(
        user.address,
        `User[${index}] should have address object`,
      ).toBeDefined();
      expect(Object.keys(user.address)).toHaveLength(6);
    });

    // Verify string arrays have correct length
    output.Posts.forEach((post: { tags: string[] }, index: number) => {
      expect(post.tags, `Post[${index}].tags should have 5 items`).toHaveLength(
        5,
      );
    });

    // Verify number arrays have correct length
    output.Comments.forEach((comment: { scores: number[] }, index: number) => {
      expect(
        comment.scores,
        `Comment[${index}].scores should have 3 items`,
      ).toHaveLength(3);
    });
  });
});
