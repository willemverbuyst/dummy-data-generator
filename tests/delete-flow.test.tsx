import App from "@/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  findByRoleClickClearType,
  findByRoleClickClearTypeTabSelect,
  findByRoleClickClearTypeTabType,
} from "./test-utils";

describe("Delete Flow Integration Test", () => {
  it("should delete fields and entities, generate output, and validate structure", async () => {
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

    const removeFieldButton = await screen.findByRole("button", {
      name: /entity-1-remove-field-2/i,
    });
    await user.click(removeFieldButton);

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

    const removeEntityButton = await screen.findByRole("button", {
      name: /remove-entity-2/i,
    });
    await user.click(removeEntityButton);

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

    if (!jsonText) {
      throw new Error("No JSON text found in output");
    }

    const output = JSON.parse(jsonText);

    expect(output).toHaveProperty("Users");
    expect(output).not.toHaveProperty("Posts");
    expect(output.Users).toHaveLength(3);
    const firstUser = output.Users[0];
    expect(firstUser).toHaveProperty("id");
    expect(firstUser).toHaveProperty("name");
    expect(firstUser).not.toHaveProperty("email");
  });
});
