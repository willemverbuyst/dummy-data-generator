import App from "@/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  findByRoleClickClearType,
  findByRoleClickClearTypeTabSelect,
  findByRoleClickClearTypeTabType,
} from "./test-utils";

describe("Reset Flow Integration Test", () => {
  it("should reset fields and entities, reset output", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for app to be ready
    const initialBadge = await screen.findByText("in sync");
    expect(initialBadge).toBeInTheDocument();

    const addEntityButton = await screen.findByRole("button", {
      name: /add entity/i,
    });
    const generateButton = screen.getByRole("button", { name: /generate/i });

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

    await user.click(generateButton);
    await waitFor(
      () => {
        expect(screen.getByText("in sync")).toBeInTheDocument();
      },
      { timeout: 30_000 },
    );

    const preElement = screen.getByRole("code");
    const jsonText = preElement.textContent;
    expect(jsonText).toBeTruthy();

    // biome-ignore lint/style/noNonNullAssertion: <-- IGNORE --->
    const output = JSON.parse(jsonText!);

    expect(output).toHaveProperty("Users");
    expect(output).toHaveProperty("Posts");
    expect(output.Users).toHaveLength(3);
    expect(output.Posts).toHaveLength(4);
    const firstUser = output.Users[0];
    expect(firstUser).toHaveProperty("id");
    expect(firstUser).toHaveProperty("name");
    expect(firstUser).toHaveProperty("email");
    const firstPost = output.Posts[0];
    expect(firstPost).toHaveProperty("id");
    expect(firstPost).toHaveProperty("title");

    const resetButton = await screen.findByRole("button", {
      name: /reset/i,
    });
    await user.click(resetButton);

    // Verify that the form has been reset
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: /^entity 1$/i })).toHaveValue(
        "",
      );
    });

    const jsonTextUpdated = preElement.textContent;
    expect(jsonTextUpdated).toBeTruthy();

    const outputUpdated = JSON.parse(jsonTextUpdated);

    expect(outputUpdated).toEqual({});
  });
});
