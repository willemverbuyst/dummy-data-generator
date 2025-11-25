import App from "@/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

describe("Full Flow Integration Test", () => {
  it("should fill the form with example data, generate output, and validate structure and references", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for app to be ready
    const initialBadge = await screen.findByText("in sync");
    expect(initialBadge).toBeInTheDocument();

    // ============================================================================
    // PART 1: FILL THE FORM WITH EXAMPLE DATA
    // ============================================================================

    // ----------------------------------------------------------------------------
    // Entity 1: User (3 records)
    // ----------------------------------------------------------------------------
    const entityInputUser = await screen.findByRole("textbox", {
      name: /^entity 1$/i,
    });
    await user.click(entityInputUser);
    await user.clear(entityInputUser);
    await user.type(entityInputUser, "User");

    const recordInput = await screen.findByRole("textbox", {
      name: /number of records/i,
    });
    await user.click(recordInput);
    await user.clear(recordInput);
    await user.type(recordInput, "3");

    const keyInput_0 = await screen.findByRole("textbox", {
      name: /^entity 1 key 1$/i,
    });
    await user.click(keyInput_0);
    await user.clear(keyInput_0);
    await user.type(keyInput_0, "name");
    await user.tab();
    await user.type(document.activeElement!, "name");
    await user.click(await screen.findByRole("option", { name: "name" }));

    const entity1AddFieldButton =
      await screen.findByTitle("entity-1-add-field");
    await user.click(entity1AddFieldButton);

    const keyInput_1 = await screen.findByRole("textbox", {
      name: /^entity 1 key 2$/i,
    });
    await user.click(keyInput_1);
    await user.clear(keyInput_1);
    await user.type(keyInput_1, "email");
    await user.tab();
    await user.type(document.activeElement!, "email");
    await user.click(await screen.findByRole("option", { name: "email" }));

    await user.click(entity1AddFieldButton);

    const keyInput_nested = await screen.findByRole("textbox", {
      name: /^entity 1 key 3$/i,
    });
    await user.click(keyInput_nested);
    await user.clear(keyInput_nested);
    await user.type(keyInput_nested, "address");
    await user.tab();
    await user.type(document.activeElement!, "nested");
    await user.click(await screen.findByRole("option", { name: "nested" }));

    const entity1Field3AddNestedFieldButton = await screen.findByTitle(
      "entity-1-field-3-add-nested-field",
    );

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_1 = await screen.findByRole("textbox", {
      name: /^entity 1 key 3 nested key 1$/i,
    });
    await user.click(key3NestedKeyInput_1);
    await user.clear(key3NestedKeyInput_1);
    await user.type(key3NestedKeyInput_1, "street");
    await user.tab();
    await user.type(document.activeElement!, "street");
    await user.click(await screen.findByRole("option", { name: "street" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_2 = await screen.findByRole("textbox", {
      name: /^entity 1 key 3 nested key 2$/i,
    });
    await user.click(key3NestedKeyInput_2);
    await user.clear(key3NestedKeyInput_2);
    await user.type(key3NestedKeyInput_2, "city");
    await user.tab();
    await user.type(document.activeElement!, "city");
    await user.click(await screen.findByRole("option", { name: "city" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_3 = await screen.findByRole("textbox", {
      name: /^entity 1 key 3 nested key 3$/i,
    });
    await user.click(key3NestedKeyInput_3);
    await user.clear(key3NestedKeyInput_3);
    await user.type(key3NestedKeyInput_3, "zipCode");
    await user.tab();
    await user.type(document.activeElement!, "zip-code");
    await user.click(await screen.findByRole("option", { name: "zip-code" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_4 = await screen.findByRole("textbox", {
      name: /^entity 1 key 3 nested key 4$/i,
    });
    await user.click(key3NestedKeyInput_4);
    await user.clear(key3NestedKeyInput_4);
    await user.type(key3NestedKeyInput_4, "country");
    await user.tab();
    await user.type(document.activeElement!, "country");
    await user.click(await screen.findByRole("option", { name: "country" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_5 = await screen.findByRole("textbox", {
      name: /^entity 1 key 3 nested key 5$/i,
    });
    await user.click(key3NestedKeyInput_5);
    await user.clear(key3NestedKeyInput_5);
    await user.type(key3NestedKeyInput_5, "state");
    await user.tab();
    await user.type(document.activeElement!, "state");
    await user.click(await screen.findByRole("option", { name: "state" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_6 = await screen.findByRole("textbox", {
      name: /^entity 1 key 3 nested key 6$/i,
    });
    await user.click(key3NestedKeyInput_6);
    await user.clear(key3NestedKeyInput_6);
    await user.type(key3NestedKeyInput_6, "buildingNumber");
    await user.tab();
    await user.type(document.activeElement!, "building-number");
    await user.click(
      await screen.findByRole("option", { name: "building-number" }),
    );

    await user.click(entity1AddFieldButton);

    const keyInput_4 = await screen.findByRole("textbox", {
      name: /^entity 1 key 4$/i,
    });
    await user.click(keyInput_4);
    await user.clear(keyInput_4);
    await user.type(keyInput_4, "age");
    await user.tab();
    await user.type(document.activeElement!, "age");
    await user.click(await screen.findByRole("option", { name: "age" }));

    await user.click(entity1AddFieldButton);

    const keyInput_5 = await screen.findByRole("textbox", {
      name: /^entity 1 key 5$/i,
    });
    await user.click(keyInput_5);
    await user.clear(keyInput_5);
    await user.type(keyInput_5, "isActive");
    await user.tab();
    await user.type(document.activeElement!, "boolean");
    await user.click(await screen.findByRole("option", { name: "boolean" }));

    await user.click(entity1AddFieldButton);

    const keyInput_6 = await screen.findByRole("textbox", {
      name: /^entity 1 key 6$/i,
    });
    await user.click(keyInput_6);
    await user.clear(keyInput_6);
    await user.type(keyInput_6, "sex");
    await user.tab();
    await user.type(document.activeElement!, "one-of");
    await user.click(await screen.findByRole("option", { name: "one of" }));
    await user.tab();
    await user.type(document.activeElement!, "male, female, other");

    // ----------------------------------------------------------------------------
    // Entity 2: Post (4 records)
    // ----------------------------------------------------------------------------
    const addEntityButton = await screen.findByRole("button", {
      name: /add entity/i,
    });
    await user.click(addEntityButton);

    const entityInputPost = await screen.findByRole("textbox", {
      name: /^entity 2$/i,
    });
    await user.click(entityInputPost);
    await user.clear(entityInputPost);

    await user.type(entityInputPost, "Post");

    await user.tab();
    await user.type(document.activeElement!, "4");

    const keyInputPost_1 = await screen.findByRole("textbox", {
      name: /^entity 2 key 1$/i,
    });
    await user.click(keyInputPost_1);
    await user.clear(keyInputPost_1);
    await user.type(keyInputPost_1, "title");
    await user.tab();
    await user.type(document.activeElement!, "word");
    await user.click(await screen.findByRole("option", { name: "word" }));

    const entity2AddFieldButton =
      await screen.findByTitle("entity-2-add-field");
    await user.click(entity2AddFieldButton);

    const keyInputPost_2 = await screen.findByRole("textbox", {
      name: /^entity 2 key 2$/i,
    });
    await user.click(keyInputPost_2);
    await user.clear(keyInputPost_2);
    await user.type(keyInputPost_2, "content");
    await user.tab();
    await user.type(document.activeElement!, "string");
    await user.click(await screen.findByRole("option", { name: "string" }));
    await user.tab();
    await user.type(document.activeElement!, "30");

    await user.click(entity2AddFieldButton);

    const keyInputPost_3 = await screen.findByRole("textbox", {
      name: /^entity 2 key 3$/i,
    });
    await user.click(keyInputPost_3);
    await user.clear(keyInputPost_3);
    await user.type(keyInputPost_3, "tags");
    await user.tab();
    await user.type(document.activeElement!, "string-array");
    await user.click(
      await screen.findByRole("option", { name: "string array" }),
    );
    await user.tab();
    await user.type(document.activeElement!, "5");

    await user.click(entity2AddFieldButton);

    const keyInputPost_4 = await screen.findByRole("textbox", {
      name: /^entity 2 key 4$/i,
    });
    await user.click(keyInputPost_4);
    await user.clear(keyInputPost_4);
    await user.type(keyInputPost_4, "authorId");
    await user.tab();
    await user.type(document.activeElement!, "reference");
    await user.click(await screen.findByRole("option", { name: "reference" }));
    await user.tab();
    await user.type(document.activeElement!, "User");

    await user.click(entity2AddFieldButton);

    const keyInputPost_5 = await screen.findByRole("textbox", {
      name: /^entity 2 key 5$/i,
    });
    await user.click(keyInputPost_5);
    await user.clear(keyInputPost_5);
    await user.type(keyInputPost_5, "published");
    await user.tab();
    await user.type(document.activeElement!, "boolean");
    await user.click(await screen.findByRole("option", { name: "boolean" }));

    // ----------------------------------------------------------------------------
    // Entity 3: Comment (5 records)
    // ----------------------------------------------------------------------------
    await user.click(addEntityButton);

    const entityInputComment = await screen.findByRole("textbox", {
      name: /^entity 3$/i,
    });
    await user.click(entityInputComment);
    await user.clear(entityInputComment);
    await user.type(entityInputComment, "Comment");
    await user.tab();
    await user.type(document.activeElement!, "5");

    const keyInputComment_1 = await screen.findByRole("textbox", {
      name: /^entity 3 key 1$/i,
    });
    await user.click(keyInputComment_1);
    await user.clear(keyInputComment_1);
    await user.type(keyInputComment_1, "content");
    await user.tab();
    await user.type(document.activeElement!, "string");
    await user.click(await screen.findByRole("option", { name: "string" }));
    await user.tab();
    await user.type(document.activeElement!, "3");

    const entity3AddFieldButton =
      await screen.findByTitle("entity-3-add-field");

    await user.click(entity3AddFieldButton);

    const keyInputComment_2 = await screen.findByRole("textbox", {
      name: /^entity 3 key 2$/i,
    });
    await user.click(keyInputComment_2);
    await user.clear(keyInputComment_2);
    await user.type(keyInputComment_2, "postId");
    await user.tab();
    await user.type(document.activeElement!, "reference");
    await user.click(await screen.findByRole("option", { name: "reference" }));
    await user.tab();
    await user.type(document.activeElement!, "Post");

    await user.click(entity3AddFieldButton);

    const keyInputComment_3 = await screen.findByRole("textbox", {
      name: /^entity 3 key 3$/i,
    });
    await user.click(keyInputComment_3);
    await user.clear(keyInputComment_3);
    await user.type(keyInputComment_3, "authorId");
    await user.tab();
    await user.type(document.activeElement!, "reference");
    await user.click(await screen.findByRole("option", { name: "reference" }));
    await user.tab();
    await user.type(document.activeElement!, "User");

    await user.click(entity3AddFieldButton);

    const keyInputComment_4 = await screen.findByRole("textbox", {
      name: /^entity 3 key 4$/i,
    });
    await user.click(keyInputComment_4);
    await user.clear(keyInputComment_4);
    await user.type(keyInputComment_4, "scores");
    await user.tab();
    await user.type(document.activeElement!, "number-array");
    await user.click(
      await screen.findByRole("option", { name: "number array" }),
    );
    await user.tab();
    await user.type(document.activeElement!, "3");

    // ============================================================================
    // GENERATE DATA
    // ============================================================================
    const generateButton = screen.getByRole("button", { name: /generate/i });

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
