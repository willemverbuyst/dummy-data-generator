describe("full flow", () => {
  it("generates dummy data", () => {
    cy.visit("http://localhost:5173/dummy-data-generator");

    fillUserEntity();
    fillPostEntity();
    fillCommentEntity();

    clickGenerate();
    assertGenerationStatusInSync();

    getAndParseJsonOutput().then((output) => {
      assertEntityStructure(output);
      assertRecordCounts(output);
      assertUserStructure(output);
      assertPostStructure(output);
      assertCommentStructure(output);
      assertReferences(output);
      assertAdditionalValidations(output);
    });
  });
});

function fillUserEntity() {
  const entityIndex = 0;

  setEntityBasics(entityIndex, "User", 3);

  fillPrimitiveField(entityIndex, 0, {
    key: "name",
    typeOption: "name",
  });

  addPrimitiveField(entityIndex, 1, {
    key: "email",
    typeOption: "email",
  });

  addNestedAddressField(entityIndex, 2);

  addPrimitiveField(entityIndex, 3, {
    key: "age",
    typeOption: "age",
  });

  addPrimitiveField(entityIndex, 4, {
    key: "isActive",
    typeOption: "boolean",
  });

  addPrimitiveField(entityIndex, 5, {
    key: "sex",
    typeOption: "one of",
    value: "male, female, other",
  });
}

function fillPostEntity() {
  const entityIndex = 1;

  addEntity();

  setEntityBasics(entityIndex, "Post", 4);

  fillPrimitiveField(entityIndex, 0, {
    key: "title",
    typeOption: "word",
  });

  addPrimitiveField(entityIndex, 1, {
    key: "content",
    typeOption: "string",
    value: "30",
  });

  addPrimitiveField(entityIndex, 2, {
    key: "tags",
    typeOption: "string array",
    value: "5",
  });

  addPrimitiveField(entityIndex, 3, {
    key: "authorId",
    typeOption: "reference",
    value: "User",
  });

  addPrimitiveField(entityIndex, 4, {
    key: "published",
    typeOption: "boolean",
  });
}

function fillCommentEntity() {
  const entityIndex = 2;

  addEntity();

  setEntityBasics(entityIndex, "Comment", 5);

  fillPrimitiveField(entityIndex, 0, {
    key: "content",
    typeOption: "string",
    value: "3",
  });

  addPrimitiveField(entityIndex, 1, {
    key: "postId",
    typeOption: "reference",
    value: "Post",
  });

  addPrimitiveField(entityIndex, 2, {
    key: "authorId",
    typeOption: "reference",
    value: "User",
  });

  addPrimitiveField(entityIndex, 3, {
    key: "scores",
    typeOption: "number array",
    value: "3",
  });
}

function addEntity() {
  cy.contains("button", "Add Entity").click();
}

function setEntityBasics(index: number, name: string, count: number) {
  cy.get(`[name="schemas.${index}.entity"]`).type(name);
  cy.get(`[name="schemas.${index}.numberOfRecords"]`).type(
    `{selectall}${count}`,
  );
}

interface PrimitiveFieldOptions {
  key: string;
  typeOption: string;
  value?: string;
}

function fillPrimitiveField(
  entityIndex: number,
  fieldIndex: number,
  options: PrimitiveFieldOptions,
) {
  cy.get(`[name="schemas.${entityIndex}.fields.${fieldIndex}.key"]`).type(
    options.key,
  );

  selectAntOption(
    `[id="schemas.${entityIndex}.fields.${fieldIndex}.type"]`,
    options.typeOption,
  );

  if (options.value !== undefined) {
    cy.get(`[name="schemas.${entityIndex}.fields.${fieldIndex}.value"]`).type(
      options.value,
    );
  }
}

function addPrimitiveField(
  entityIndex: number,
  fieldIndex: number,
  options: PrimitiveFieldOptions,
) {
  clickAddField(entityIndex);
  fillPrimitiveField(entityIndex, fieldIndex, options);
}

function addNestedAddressField(entityIndex: number, fieldIndex = 2) {
  clickAddField(entityIndex);

  cy.get(`[name="schemas.${entityIndex}.fields.${fieldIndex}.key"]`).type(
    "address",
  );

  selectAntOption(
    `[id="schemas.${entityIndex}.fields.${fieldIndex}.type"]`,
    "nested",
  );

  addNestedField(entityIndex, fieldIndex, 0, "street", "street");
  addNestedField(entityIndex, fieldIndex, 1, "city", "city");
  addNestedField(entityIndex, fieldIndex, 2, "zipCode", "zip code");
  addNestedField(entityIndex, fieldIndex, 3, "country", "country");
  addNestedField(entityIndex, fieldIndex, 4, "state", "state");
  addNestedField(
    entityIndex,
    fieldIndex,
    5,
    "buildingNumber",
    "building number",
  );
}

function addNestedField(
  entityIndex: number,
  parentFieldIndex: number,
  nestedIndex: number,
  key: string,
  typeOption: string,
) {
  clickAddNestedField(entityIndex, parentFieldIndex);

  cy.get(
    `[name="schemas.${entityIndex}.fields.${parentFieldIndex}.value.${nestedIndex}.key"]`,
  ).type(key);

  selectAntOption(
    `[id="schemas.${entityIndex}.fields.${parentFieldIndex}.value.${nestedIndex}.type"]`,
    typeOption,
  );
}

function clickAddField(entityIndex: number) {
  cy.get(`[aria-label="entity-${entityIndex + 1}-add-field"]`).click();
}

function clickAddNestedField(entityIndex: number, parentFieldIndex: number) {
  cy.get(
    `[aria-label="entity-${entityIndex + 1}-field-${parentFieldIndex + 1}-add-nested-field"]`,
  ).click();
}

function selectAntOption(inputSelector: string, optionText: string) {
  cy.get(inputSelector).click();
  cy.get(".ant-select-dropdown:visible")
    .contains(".ant-select-item-option", optionText)
    .click();
}

function clickGenerate() {
  cy.contains("button", "Generate").click();
}

function assertGenerationStatusInSync() {
  cy.get(".ant-tag").should("contain.text", "in sync");
}

type Output = {
  Users: Array<{
    id: string;
    name: string;
    email: string;
    address: {
      street: string;
      city: string;
      zipCode: string;
      country: string;
      state: string;
      buildingNumber: string;
    };
    age: number;
    isActive: boolean;
    sex: "male" | "female" | "other";
  }>;
  Posts: Array<{
    id: string;
    title: string;
    content: string;
    tags: string[];
    authorId: string;
    published: boolean;
  }>;
  Comments: Array<{
    id: string;
    content: string;
    postId: string;
    authorId: string;
    scores: number[];
  }>;
};

function getAndParseJsonOutput() {
  return cy
    .get("code")
    .should("exist")
    .invoke("text")
    .then((jsonText) => {
      expect(jsonText).to.not.be.empty;

      const output: Output = JSON.parse(jsonText);

      return cy.wrap(output);
    });
}

function assertEntityStructure(output: Output) {
  expect(output).to.have.property("Users");
  expect(output).to.have.property("Posts");
  expect(output).to.have.property("Comments");
}

function assertRecordCounts(output: Output) {
  expect(output.Users).to.have.length(3);
  expect(output.Posts).to.have.length(4);
  expect(output.Comments).to.have.length(5);
}

function assertUserStructure(output: Output) {
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
}

function assertPostStructure(output: Output) {
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
}

function assertCommentStructure(output: Output) {
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
}

function assertReferences(output: Output) {
  const userIds = output.Users.map((user) => user.id);
  expect(userIds).to.have.length(3);

  const postIds = output.Posts.map((post) => post.id);
  expect(postIds).to.have.length(4);

  const commentIds = output.Comments.map((comment) => comment.id);
  expect(commentIds).to.have.length(5);

  output.Posts.forEach((post, index) => {
    expect(
      userIds,
      `Post[${index}].authorId should reference a valid User`,
    ).to.contain(post.authorId);
  });

  output.Comments.forEach((comment, index) => {
    expect(
      userIds,
      `Comment[${index}].authorId should reference a valid User`,
    ).to.contain(comment.authorId);
  });

  output.Comments.forEach((comment, index) => {
    expect(
      postIds,
      `Comment[${index}].postId should reference a valid Post`,
    ).to.contain(comment.postId);
  });
}

function assertAdditionalValidations(output: Output) {
  const allIds = [
    ...output.Users.map((u) => u.id),
    ...output.Posts.map((p) => p.id),
    ...output.Comments.map((c) => c.id),
  ];
  const uniqueIds = new Set(allIds);

  expect(uniqueIds.size).to.be.equal(allIds.length);

  output.Users.forEach((user, index) => {
    expect(
      Object.keys(user.address),
      `User[${index}] should have address object`,
    ).to.have.length(6);
  });

  output.Posts.forEach((post, index) => {
    expect(post.tags, `Post[${index}].tags should have 5 items`).to.have.length(
      5,
    );
  });

  output.Comments.forEach((comment, index) => {
    expect(
      comment.scores,
      `Comment[${index}].scores should have 3 items`,
    ).to.have.length(3);
  });
}
