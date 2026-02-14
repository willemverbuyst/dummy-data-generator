describe("full flow", () => {
  it("generates dummy data", () => {
    cy.visit("http://localhost:5173/dummy-data-generator");

    // ============================================================================
    // PART 1: FILL THE FORM WITH EXAMPLE DATA
    // ============================================================================

    // ----------------------------------------------------------------------------
    // Entity 1: User (3 records)
    // ----------------------------------------------------------------------------
    cy.get('[name="schemas.0.entity"]').type("User");
    cy.get('[name="schemas.0.numberOfRecords"]').type("{selectall}3");

    cy.get('[name="schemas.0.fields.0.key"]').type("name");
    cy.get('[id="schemas.0.fields.0.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "name").click();
    });

    cy.get('[aria-label="entity-1-add-field"]').click();

    cy.get('[name="schemas.0.fields.1.key"]').type("email");
    cy.get('[id="schemas.0.fields.1.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "email").click();
    });

    cy.get('[aria-label="entity-1-add-field"]').click();

    cy.get('[name="schemas.0.fields.2.key"]').type("address");
    cy.get('[id="schemas.0.fields.2.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "nested").click();
    });

    cy.get('[aria-label="entity-1-field-3-add-nested-field"]').click();

    cy.get('[name="schemas.0.fields.2.value.0.key"]').type("street");
    cy.get('[id="schemas.0.fields.2.value.0.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "street").click();
    });

    cy.get('[aria-label="entity-1-field-3-add-nested-field"]').click();

    cy.get('[name="schemas.0.fields.2.value.1.key"]').type("city");
    cy.get('[id="schemas.0.fields.2.value.1.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "city").click();
    });

    cy.get('[aria-label="entity-1-field-3-add-nested-field"]').click();

    cy.get('[name="schemas.0.fields.2.value.2.key"]').type("zipCode");
    cy.get('[id="schemas.0.fields.2.value.2.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "zip code").click();
    });

    cy.get('[aria-label="entity-1-field-3-add-nested-field"]').click();

    cy.get('[name="schemas.0.fields.2.value.3.key"]').type("country");
    cy.get('[id="schemas.0.fields.2.value.3.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "country").click();
    });

    cy.get('[aria-label="entity-1-field-3-add-nested-field"]').click();

    cy.get('[name="schemas.0.fields.2.value.4.key"]').type("state");
    cy.get('[id="schemas.0.fields.2.value.4.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "state").click();
    });

    cy.get('[aria-label="entity-1-field-3-add-nested-field"]').click();

    cy.get('[name="schemas.0.fields.2.value.5.key"]').type("buildingNumber");
    cy.get('[id="schemas.0.fields.2.value.5.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "building number").click();
    });

    cy.get('[aria-label="entity-1-add-field"]').click();

    cy.get('[name="schemas.0.fields.3.key"]').type("age");
    cy.get('[id="schemas.0.fields.3.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "age").click();
    });

    cy.get('[aria-label="entity-1-add-field"]').click();

    cy.get('[name="schemas.0.fields.4.key"]').type("isActive");
    cy.get('[id="schemas.0.fields.4.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "boolean").click();
    });

    cy.get('[aria-label="entity-1-add-field"]').click();

    cy.get('[name="schemas.0.fields.5.key"]').type("sex");
    cy.get('[id="schemas.0.fields.5.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "one of").click();
    });
    cy.get('[name="schemas.0.fields.5.value"]').type("male, female, other");

    // ----------------------------------------------------------------------------
    // Entity 2: Post (4 records)
    // ----------------------------------------------------------------------------
    cy.get("button").contains("Add Entity").click();

    cy.get('[name="schemas.1.entity"]').type("Post");
    cy.get('[name="schemas.1.numberOfRecords"]').type("{selectall}4");

    cy.get('[name="schemas.1.fields.0.key"]').type("title");
    cy.get('[id="schemas.1.fields.0.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "word").click();
    });

    cy.get('[aria-label="entity-2-add-field"]').click();

    cy.get('[name="schemas.1.fields.1.key"]').type("content");
    cy.get('[id="schemas.1.fields.1.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "string").click();
    });
    cy.get('[name="schemas.1.fields.1.value"]').type("30");

    cy.get('[aria-label="entity-2-add-field"]').click();

    cy.get('[name="schemas.1.fields.2.key"]').type("tags");
    cy.get('[id="schemas.1.fields.2.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "string array").click();
    });
    cy.get('[name="schemas.1.fields.2.value"]').type("5");

    cy.get('[aria-label="entity-2-add-field"]').click();

    cy.get('[name="schemas.1.fields.3.key"]').type("authorId");
    cy.get('[id="schemas.1.fields.3.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "reference").click();
    });
    cy.get('[name="schemas.1.fields.3.value"]').type("User");

    cy.get('[aria-label="entity-2-add-field"]').click();

    cy.get('[name="schemas.1.fields.4.key"]').type("published");
    cy.get('[id="schemas.1.fields.4.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "boolean").click();
    });

    // ----------------------------------------------------------------------------
    // Entity 3: Comment (5 records)
    // ----------------------------------------------------------------------------
    cy.get("button").contains("Add Entity").click();

    cy.get('[name="schemas.2.entity"]').type("Comment");
    cy.get('[name="schemas.2.numberOfRecords"]').type("{selectall}5");

    cy.get('[name="schemas.2.fields.0.key"]').type("content");
    cy.get('[id="schemas.2.fields.0.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "string").click();
    });
    cy.get('[name="schemas.2.fields.0.value"]').type("3");

    cy.get('[aria-label="entity-3-add-field"]').click();

    cy.get('[name="schemas.2.fields.1.key"]').type("postId");
    cy.get('[id="schemas.2.fields.1.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "reference").click();
    });
    cy.get('[name="schemas.2.fields.1.value"]').type("Post");

    cy.get('[aria-label="entity-3-add-field"]').click();

    cy.get('[name="schemas.2.fields.2.key"]').type("authorId");
    cy.get('[id="schemas.2.fields.2.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "reference").click();
    });
    cy.get('[name="schemas.2.fields.2.value"]').type("User");

    cy.get('[aria-label="entity-3-add-field"]').click();

    cy.get('[name="schemas.2.fields.3.key"]').type("scores");
    cy.get('[id="schemas.2.fields.3.type"]').click();
    cy.get(".ant-select-dropdown:visible").within(() => {
      cy.contains(".ant-select-item-option", "number array").click();
    });
    cy.get('[name="schemas.2.fields.3.value"]').type("3");

    // ============================================================================
    // GENERATE DATA
    // ============================================================================
    cy.get("button").contains("Generate").click();

    cy.get(".ant-tag").should("contain.text", "in sync");

    // ============================================================================
    // PART 2: VALIDATE THE OUTPUT
    // ============================================================================
    cy.get("code")
      .should("exist")
      .invoke("text")
      .then((jsonText) => {
        expect(jsonText).to.not.be.empty;

        const output = JSON.parse(jsonText);

        // ----------------------------------------------------------------------------
        // Validate Entity Structure
        // ----------------------------------------------------------------------------
        expect(output).to.have.property("Users");
        expect(output).to.have.property("Posts");
        expect(output).to.have.property("Comments");

        // ----------------------------------------------------------------------------
        // Validate Record Counts
        // ----------------------------------------------------------------------------
        expect(output.Users).to.have.length(3);
        expect(output.Posts).to.have.length(4);
        expect(output.Comments).to.have.length(5);

        // ----------------------------------------------------------------------------
        // Validate User Structure and Types
        // ----------------------------------------------------------------------------
        const firstUser = output.Users[0];
        expect(firstUser).to.have.property("id");
        expect(firstUser.id).to.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        );
        expect(firstUser).to.have.property("name");
        expect(typeof firstUser.name).to.be.equal("string");
        expect(firstUser).to.have.property("email");
        expect(typeof firstUser.email).to.be.equal("string");
        expect(firstUser).to.have.property("address");
        expect(typeof firstUser.address).to.be.equal("object");
        expect(firstUser.address).to.have.property("street");
        expect(firstUser.address).to.have.property("city");
        expect(firstUser.address).to.have.property("zipCode");
        expect(firstUser.address).to.have.property("country");
        expect(firstUser.address).to.have.property("state");
        expect(firstUser.address).to.have.property("buildingNumber");
        expect(firstUser).to.have.property("age");
        expect(typeof firstUser.age).to.be.equal("number");
        expect(firstUser).to.have.property("isActive");
        expect(typeof firstUser.isActive).to.be.equal("boolean");
        expect(firstUser).to.have.property("sex");
        expect(["male", "female", "other"]).to.contain(firstUser.sex);

        // ----------------------------------------------------------------------------
        // Validate Post Structure and Types
        // ----------------------------------------------------------------------------
        const firstPost = output.Posts[0];
        expect(firstPost).to.have.property("id");
        expect(firstPost.id).to.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        );
        expect(firstPost).to.have.property("title");
        expect(typeof firstPost.title).to.be.equal("string");
        expect(firstPost).to.have.property("content");
        expect(typeof firstPost.content).to.be.equal("string");
        expect(firstPost.content.length).to.be.greaterThan(0);
        expect(firstPost).to.have.property("tags");
        expect(Array.isArray(firstPost.tags)).to.be.equal(true);
        expect(firstPost.tags).to.have.length(5);
        expect(typeof firstPost.tags[0]).to.be.equal("string");
        expect(firstPost).to.have.property("authorId");
        expect(typeof firstPost.authorId).to.be.equal("string");
        expect(firstPost).to.have.property("published");
        expect(typeof firstPost.published).to.be.equal("boolean");

        // ----------------------------------------------------------------------------
        // Validate Comment Structure and Types
        // ----------------------------------------------------------------------------
        const firstComment = output.Comments[0];
        expect(firstComment).to.have.property("id");
        expect(firstComment.id).to.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        );
        expect(firstComment).to.have.property("content");
        expect(typeof firstComment.content).to.be.equal("string");
        expect(firstComment).to.have.property("postId");
        expect(typeof firstComment.postId).to.be.equal("string");
        expect(firstComment).to.have.property("authorId");
        expect(typeof firstComment.authorId).to.be.equal("string");
        expect(firstComment).to.have.property("scores");
        expect(Array.isArray(firstComment.scores)).to.be.equal(true);
        expect(firstComment.scores).to.have.length(3);
        expect(typeof firstComment.scores[0]).to.be.equal("number");

        // ----------------------------------------------------------------------------
        // Validate UUID References - Critical Test
        // ----------------------------------------------------------------------------
        const userIds = output.Users.map((user: { id: string }) => user.id);
        expect(userIds).to.have.length(3);

        const postIds = output.Posts.map((post: { id: string }) => post.id);
        expect(postIds).to.have.length(4);

        const commentIds = output.Comments.map(
          (comment: { id: string }) => comment.id,
        );
        expect(commentIds).to.have.length(5);

        // Validate Post.authorId references exist in Users
        output.Posts.forEach((post: { authorId: string }, index: number) => {
          expect(
            userIds,
            `Post[${index}].authorId should reference a valid User`,
          ).to.contain(post.authorId);
        });

        // Validate Comment.authorId references exist in Users
        output.Comments.forEach(
          (comment: { authorId: string }, index: number) => {
            expect(
              userIds,
              `Comment[${index}].authorId should reference a valid User`,
            ).to.contain(comment.authorId);
          },
        );

        // Validate Comment.postId references exist in Posts
        output.Comments.forEach(
          (comment: { postId: string }, index: number) => {
            expect(
              postIds,
              `Comment[${index}].postId should reference a valid Post`,
            ).to.contain(comment.postId);
          },
        );

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
        expect(uniqueIds.size).to.be.equal(allIds.length);

        // Verify nested address structure for all users
        output.Users.forEach((user: { address: object }, index: number) => {
          expect(
            Object.keys(user.address),
            `User[${index}] should have address object`,
          ).to.have.length(6);
        });

        // Verify string arrays have correct length
        output.Posts.forEach((post: { tags: string[] }, index: number) => {
          expect(
            post.tags,
            `Post[${index}].tags should have 5 items`,
          ).to.have.length(5);
        });

        // Verify number arrays have correct length
        output.Comments.forEach(
          (comment: { scores: number[] }, index: number) => {
            expect(
              comment.scores,
              `Comment[${index}].scores should have 3 items`,
            ).to.have.length(3);
          },
        );
      });
  });
});
