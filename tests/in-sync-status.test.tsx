import App from "@/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("InSyncBadge Integration Tests", () => {
  it.only("shows 'not in sync' when form is modified and 'in sync' after submitting", async () => {
    const user = userEvent.setup();

    // Render the full app
    render(<App />);

    // Wait for the app to load and verify initial state shows "in sync"
    const initialBadge = await screen.findByText("in sync");
    expect(initialBadge).toBeInTheDocument();

    // Find and fill in the entity name input (first entity in the form)
    const entityInput = screen.getByPlaceholderText("Enter entity name");

    // Focus and blur to trigger the touch event
    await user.click(entityInput);
    await user.clear(entityInput);
    await user.type(entityInput, "User");

    const keyInput = screen.getByPlaceholderText("e.g. name");
    await user.click(keyInput);
    await user.clear(keyInput);
    await user.type(keyInput, "name");

    const valueTypeInput = screen.getByPlaceholderText("Select a value type");
    await user.click(valueTypeInput);
    await user.type(valueTypeInput, "string");

    // After modifying the form, the badge should show "not in sync"
    await waitFor(
      () => {
        expect(screen.getByText("not in sync")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Find and click the Generate button to submit the form
    const generateButton = screen.getByRole("button", { name: /generate/i });
    await user.click(generateButton);

    // After submitting, the badge should show "in sync" again
    await waitFor(
      () => {
        expect(screen.getByText("in sync")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it("maintains 'not in sync' status across multiple form changes until submission", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Wait for initial state
    await screen.findByText("in sync");

    // Modify the entity name
    const entityInput = screen.getByPlaceholderText("Enter entity name");
    await user.click(entityInput);
    await user.clear(entityInput);
    await user.type(entityInput, "Product");
    await user.tab();

    // Should show "not in sync"
    await waitFor(
      () => {
        expect(screen.getByText("not in sync")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Make another change - find the amount input
    const amountInput = screen.getByPlaceholderText("Enter amount");
    await user.click(amountInput);
    await user.clear(amountInput);
    await user.type(amountInput, "5");
    await user.tab();

    // Should still show "not in sync"
    expect(screen.getByText("not in sync")).toBeInTheDocument();

    // Submit the form
    const generateButton = screen.getByRole("button", { name: /generate/i });
    await user.click(generateButton);

    // Should show "in sync" after submission
    await waitFor(
      () => {
        expect(screen.getByText("in sync")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it("resets to 'in sync' when Reset button is clicked", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("in sync");

    const entityInput = screen.getByPlaceholderText("Enter entity name");
    await user.click(entityInput);
    await user.clear(entityInput);
    await user.type(entityInput, "Order");
    await user.tab();

    await waitFor(
      () => {
        expect(screen.getByText("not in sync")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    const resetButton = screen.getByRole("button", { name: /reset/i });
    await user.click(resetButton);

    await waitFor(
      () => {
        expect(screen.getByText("in sync")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
