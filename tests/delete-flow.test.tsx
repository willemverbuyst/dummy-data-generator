import App from "@/App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

describe("Delete Flow Integration Test", () => {
  it("should delete fields and entities, generate output, and validate structure", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for app to be ready
    const initialBadge = await screen.findByText("in sync");
    expect(initialBadge).toBeInTheDocument();

    const addEntityButton = await screen.findByRole("button", {
      name: /add-entity-button/i,
    });
    const generateButton = screen.getByRole("button", {
      name: /generate-data-button/i,
    });
    const entity1AddFieldButton = await screen.findByRole("button", {
      name: "entity-1-add-field",
    });
    const entity1NameInput = await screen.findByRole("textbox", {
      name: /name of entity/i,
    });

    await user.click(entity1NameInput);
    await user.type(entity1NameInput, "User");
    await user.tab();
    fireEvent.change(document.activeElement as HTMLElement, {
      target: { value: 3 },
    });
    await user.tab();
    await user.type(document.activeElement as HTMLElement, "name");
    await user.tab();
    await user.type(document.activeElement as HTMLElement, "name");
    await user.click(entity1AddFieldButton);
    await user.type(document.activeElement as HTMLElement, "email");
    await user.tab();
    await user.type(document.activeElement as HTMLElement, "email");
    await user.click(addEntityButton);
    await user.type(document.activeElement as HTMLElement, "Post");
    await user.tab();
    fireEvent.change(document.activeElement as HTMLElement, {
      target: { value: 4 },
    });
    await user.tab();
    await user.type(document.activeElement as HTMLElement, "title");
    await user.tab();
    await user.type(document.activeElement as HTMLElement, "word");

    const removeField2Button = await screen.findByRole("button", {
      name: "entity-1-remove-field-2",
    });
    const removeEntityButton = await screen.findByRole("button", {
      name: "remove-entity-2",
    });

    await user.click(removeField2Button);
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
