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
    const entityInput = screen.getByRole("textbox", {
      name: /^entity 1$/i,
    });
    await user.click(entityInput);
    await user.clear(entityInput);
    await user.type(entityInput, "User");

    const recordInput = screen.getByRole("textbox", {
      name: /number of records/i,
    });
    await user.click(recordInput);
    await user.clear(recordInput);
    await user.type(recordInput, "3");

    const keyInput_0 = screen.getByRole("textbox", {
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

    const keyInput_1 = screen.getByRole("textbox", {
      name: /^entity 1 key 2$/i,
    });
    await user.click(keyInput_1);
    await user.clear(keyInput_1);
    await user.type(keyInput_1, "email");
    await user.tab();
    await user.type(document.activeElement!, "email");
    await user.click(await screen.findByRole("option", { name: "email" }));

    await user.click(entity1AddFieldButton);

    const keyInput_nested = screen.getByRole("textbox", {
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

    const key3NestedKeyInput_1 = screen.getByRole("textbox", {
      name: /^entity 1 key 3 nested key 1$/i,
    });
    await user.click(key3NestedKeyInput_1);
    await user.clear(key3NestedKeyInput_1);
    await user.type(key3NestedKeyInput_1, "street");
    await user.tab();
    await user.type(document.activeElement!, "street");
    await user.click(await screen.findByRole("option", { name: "street" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_2 = screen.getByRole("textbox", {
      name: /^entity 1 key 3 nested key 2$/i,
    });
    await user.click(key3NestedKeyInput_2);
    await user.clear(key3NestedKeyInput_2);
    await user.type(key3NestedKeyInput_2, "city");
    await user.tab();
    await user.type(document.activeElement!, "city");
    await user.click(await screen.findByRole("option", { name: "city" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_3 = screen.getByRole("textbox", {
      name: /^entity 1 key 3 nested key 3$/i,
    });
    await user.click(key3NestedKeyInput_3);
    await user.clear(key3NestedKeyInput_3);
    await user.type(key3NestedKeyInput_3, "zipCode");
    await user.tab();
    await user.type(document.activeElement!, "zip-code");
    await user.click(await screen.findByRole("option", { name: "zip-code" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_4 = screen.getByRole("textbox", {
      name: /^entity 1 key 3 nested key 4$/i,
    });
    await user.click(key3NestedKeyInput_4);
    await user.clear(key3NestedKeyInput_4);
    await user.type(key3NestedKeyInput_4, "country");
    await user.tab();
    await user.type(document.activeElement!, "country");
    await user.click(await screen.findByRole("option", { name: "country" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_5 = screen.getByRole("textbox", {
      name: /^entity 1 key 3 nested key 5$/i,
    });
    await user.click(key3NestedKeyInput_5);
    await user.clear(key3NestedKeyInput_5);
    await user.type(key3NestedKeyInput_5, "state");
    await user.tab();
    await user.type(document.activeElement!, "state");
    await user.click(await screen.findByRole("option", { name: "state" }));

    await user.click(entity1Field3AddNestedFieldButton);

    const key3NestedKeyInput_6 = screen.getByRole("textbox", {
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

    const keyInput_4 = screen.getByRole("textbox", {
      name: /^entity 1 key 4$/i,
    });
    await user.click(keyInput_4);
    await user.clear(keyInput_4);
    await user.type(keyInput_4, "age");
    await user.tab();
    await user.type(document.activeElement!, "age");
    await user.click(await screen.findByRole("option", { name: "age" }));

    await user.click(entity1AddFieldButton);

    const keyInput_5 = screen.getByRole("textbox", {
      name: /^entity 1 key 5$/i,
    });
    await user.click(keyInput_5);
    await user.clear(keyInput_5);
    await user.type(keyInput_5, "isActive");
    await user.tab();
    await user.type(document.activeElement!, "boolean");
    await user.click(await screen.findByRole("option", { name: "boolean" }));

    await user.click(entity1AddFieldButton);

    const keyInput_6 = screen.getByRole("textbox", {
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

    //   // ----------------------------------------------------------------------------
    //   // Entity 2: Post (4 records)
    //   // ----------------------------------------------------------------------------
    //   await addEntity(user);
    //   await fillEntityDetails(user, 1, "Post", 4);

    //   // Field 1: title (type: word)
    //   const postFieldStartIndex = 6; // After User's 6 fields
    //   await fillSimpleField(user, postFieldStartIndex, "title", "word");

    //   // Field 2: content (type: string, value: 30)
    //   await addField(user);
    //   await fillFieldWithValue(
    //     user,
    //     postFieldStartIndex + 1,
    //     "content",
    //     "string",
    //     30,
    //   );

    //   // Field 3: tags (type: string-array, value: 5)
    //   await addField(user);
    //   await fillFieldWithValue(
    //     user,
    //     postFieldStartIndex + 2,
    //     "tags",
    //     "string-array",
    //     5,
    //   );

    //   // Field 4: authorId (type: reference, value: "User")
    //   await addField(user);
    //   await fillFieldWithValue(
    //     user,
    //     postFieldStartIndex + 3,
    //     "authorId",
    //     "reference",
    //     "User",
    //   );

    //   // Field 5: published (type: boolean)
    //   await addField(user);
    //   await fillSimpleField(
    //     user,
    //     postFieldStartIndex + 4,
    //     "published",
    //     "boolean",
    //   );

    //   // ----------------------------------------------------------------------------
    //   // Entity 3: Comment (5 records)
    //   // ----------------------------------------------------------------------------
    //   await addEntity(user);
    //   await fillEntityDetails(user, 2, "Comment", 5);

    //   // Field 1: content (type: string, value: 3)
    //   const commentFieldStartIndex = postFieldStartIndex + 5;
    //   await fillFieldWithValue(
    //     user,
    //     commentFieldStartIndex,
    //     "content",
    //     "string",
    //     3,
    //   );

    //   // Field 2: postId (type: reference, value: "Post")
    //   await addField(user);
    //   await fillFieldWithValue(
    //     user,
    //     commentFieldStartIndex + 1,
    //     "postId",
    //     "reference",
    //     "Post",
    //   );

    //   // Field 3: authorId (type: reference, value: "User")
    //   await addField(user);
    //   await fillFieldWithValue(
    //     user,
    //     commentFieldStartIndex + 2,
    //     "authorId",
    //     "reference",
    //     "User",
    //   );

    //   // Field 4: scores (type: number-array, value: 3)
    //   await addField(user);
    //   await fillFieldWithValue(
    //     user,
    //     commentFieldStartIndex + 3,
    //     "scores",
    //     "number-array",
    //     3,
    //   );

    //   // ----------------------------------------------------------------------------
    //   // Entity 4: Note (20 records)
    //   // ----------------------------------------------------------------------------
    //   await addEntity(user);
    //   await fillEntityDetails(user, 3, "Note", 20);

    //   // Field 1: scribble (type: string, value: 5)
    //   const noteFieldStartIndex = commentFieldStartIndex + 4;
    //   await fillFieldWithValue(
    //     user,
    //     noteFieldStartIndex,
    //     "scribble",
    //     "string",
    //     5,
    //   );

    //   // Field 2: authorId (type: reference, value: "User")
    //   await addField(user);
    //   await fillFieldWithValue(
    //     user,
    //     noteFieldStartIndex + 1,
    //     "authorId",
    //     "reference",
    //     "User",
    //   );

    //   // Field 3: commentId (type: reference, value: "Comment")
    //   await addField(user);
    //   await fillFieldWithValue(
    //     user,
    //     noteFieldStartIndex + 2,
    //     "commentId",
    //     "reference",
    //     "Comment",
    //   );

    // ============================================================================
    // GENERATE DATA
    // ============================================================================
    const generateButton = screen.getByRole("button", { name: /generate/i });
    await user.click(generateButton);

    // Wait for generation to complete (300ms setTimeout + processing)
    await waitFor(
      () => {
        expect(screen.getByText("in sync")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // ============================================================================
    // PART 2: VALIDATE THE OUTPUT
    // ============================================================================

    // Get the JSON output from DataDisplay
    const preElement = screen.getByRole("code");
    const jsonText = preElement.textContent;
    expect(jsonText).toBeTruthy();

    // Parse the JSON
    const output = JSON.parse(jsonText!);

    //   // ----------------------------------------------------------------------------
    //   // Validate Entity Structure
    //   // ----------------------------------------------------------------------------
    expect(output).toHaveProperty("Users");
    // expect(output).toHaveProperty("Posts");
    //   expect(output).toHaveProperty("Comments");
    //   expect(output).toHaveProperty("Notes");

    //   // ----------------------------------------------------------------------------
    //   // Validate Record Counts
    //   // ----------------------------------------------------------------------------
    expect(output.Users).toHaveLength(3);
    //   expect(output.Posts).toHaveLength(4);
    //   expect(output.Comments).toHaveLength(5);
    //   expect(output.Notes).toHaveLength(20);

    //   // ----------------------------------------------------------------------------
    //   // Validate User Structure and Types
    //   // ----------------------------------------------------------------------------
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

    //   // ----------------------------------------------------------------------------
    //   // Validate Post Structure and Types
    //   // ----------------------------------------------------------------------------
    //   const firstPost = output.Posts[0];
    //   expect(firstPost).toHaveProperty("id");
    //   expect(firstPost.id).toMatch(
    //     /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    //   );
    //   expect(firstPost).toHaveProperty("title");
    //   expect(typeof firstPost.title).toBe("string");
    //   expect(firstPost).toHaveProperty("content");
    //   expect(typeof firstPost.content).toBe("string");
    //   expect(firstPost.content.length).toBeGreaterThan(0);
    //   expect(firstPost).toHaveProperty("tags");
    //   expect(Array.isArray(firstPost.tags)).toBe(true);
    //   expect(firstPost.tags).toHaveLength(5);
    //   expect(typeof firstPost.tags[0]).toBe("string");
    //   expect(firstPost).toHaveProperty("authorId");
    //   expect(typeof firstPost.authorId).toBe("string");
    //   expect(firstPost).toHaveProperty("published");
    //   expect(typeof firstPost.published).toBe("boolean");

    //   // ----------------------------------------------------------------------------
    //   // Validate Comment Structure and Types
    //   // ----------------------------------------------------------------------------
    //   const firstComment = output.Comments[0];
    //   expect(firstComment).toHaveProperty("id");
    //   expect(firstComment.id).toMatch(
    //     /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    //   );
    //   expect(firstComment).toHaveProperty("content");
    //   expect(typeof firstComment.content).toBe("string");
    //   expect(firstComment).toHaveProperty("postId");
    //   expect(typeof firstComment.postId).toBe("string");
    //   expect(firstComment).toHaveProperty("authorId");
    //   expect(typeof firstComment.authorId).toBe("string");
    //   expect(firstComment).toHaveProperty("scores");
    //   expect(Array.isArray(firstComment.scores)).toBe(true);
    //   expect(firstComment.scores).toHaveLength(3);
    //   expect(typeof firstComment.scores[0]).toBe("number");

    //   // ----------------------------------------------------------------------------
    //   // Validate Note Structure and Types
    //   // ----------------------------------------------------------------------------
    //   const firstNote = output.Notes[0];
    //   expect(firstNote).toHaveProperty("id");
    //   expect(firstNote.id).toMatch(
    //     /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    //   );
    //   expect(firstNote).toHaveProperty("scribble");
    //   expect(typeof firstNote.scribble).toBe("string");
    //   expect(firstNote).toHaveProperty("authorId");
    //   expect(typeof firstNote.authorId).toBe("string");
    //   expect(firstNote).toHaveProperty("commentId");
    //   expect(typeof firstNote.commentId).toBe("string");

    //   // ----------------------------------------------------------------------------
    //   // Validate UUID References - Critical Test
    //   // ----------------------------------------------------------------------------

    //   // Collect all User IDs
    //   const userIds = output.Users.map((user: { id: string }) => user.id);
    //   expect(userIds).toHaveLength(3);

    //   // Collect all Post IDs
    //   const postIds = output.Posts.map((post: { id: string }) => post.id);
    //   expect(postIds).toHaveLength(4);

    //   // Collect all Comment IDs
    //   const commentIds = output.Comments.map(
    //     (comment: { id: string }) => comment.id,
    //   );
    //   expect(commentIds).toHaveLength(5);

    //   // Validate Post.authorId references exist in Users
    //   output.Posts.forEach((post: { authorId: string }, index: number) => {
    //     expect(
    //       userIds,
    //       `Post[${index}].authorId should reference a valid User`,
    //     ).toContain(post.authorId);
    //   });

    //   // Validate Comment.authorId references exist in Users
    //   output.Comments.forEach((comment: { authorId: string }, index: number) => {
    //     expect(
    //       userIds,
    //       `Comment[${index}].authorId should reference a valid User`,
    //     ).toContain(comment.authorId);
    //   });

    //   // Validate Comment.postId references exist in Posts
    //   output.Comments.forEach((comment: { postId: string }, index: number) => {
    //     expect(
    //       postIds,
    //       `Comment[${index}].postId should reference a valid Post`,
    //     ).toContain(comment.postId);
    //   });

    //   // Validate Note.authorId references exist in Users
    //   output.Notes.forEach((note: { authorId: string }, index: number) => {
    //     expect(
    //       userIds,
    //       `Note[${index}].authorId should reference a valid User`,
    //     ).toContain(note.authorId);
    //   });

    //   // Validate Note.commentId references exist in Comments
    //   output.Notes.forEach((note: { commentId: string }, index: number) => {
    //     expect(
    //       commentIds,
    //       `Note[${index}].commentId should reference a valid Comment`,
    //     ).toContain(note.commentId);
    //   });

    //   // ----------------------------------------------------------------------------
    //   // Additional Validations
    //   // ----------------------------------------------------------------------------

    //   // Verify all entities have unique IDs
    //   const allIds = [
    //     ...output.Users.map((u: { id: string }) => u.id),
    //     ...output.Posts.map((p: { id: string }) => p.id),
    //     ...output.Comments.map((c: { id: string }) => c.id),
    //     ...output.Notes.map((n: { id: string }) => n.id),
    //   ];
    //   const uniqueIds = new Set(allIds);
    //   expect(uniqueIds.size).toBe(allIds.length);

    //   // Verify nested address structure for all users
    //   output.Users.forEach((user: { address: object }, index: number) => {
    //     expect(
    //       user.address,
    //       `User[${index}] should have address object`,
    //     ).toBeDefined();
    //     expect(Object.keys(user.address)).toHaveLength(6);
    //   });

    //   // Verify string arrays have correct length
    //   output.Posts.forEach((post: { tags: string[] }, index: number) => {
    //     expect(post.tags, `Post[${index}].tags should have 5 items`).toHaveLength(
    //       5,
    //     );
    //   });

    //   // Verify number arrays have correct length
    //   output.Comments.forEach((comment: { scores: number[] }, index: number) => {
    //     expect(
    //       comment.scores,
    //       `Comment[${index}].scores should have 3 items`,
    //     ).toHaveLength(3);
    //   });

    // screen.logTestingPlaygroundURL();
  });
});
