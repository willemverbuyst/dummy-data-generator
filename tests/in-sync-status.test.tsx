import App from "@/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { clickClearType } from "./test-utils";

describe("InSyncBadge Integration Tests", () => {
  it("shows 'not in sync' when form is modified and 'in sync' after submitting", async () => {
    const user = userEvent.setup();

    render(<App />);

    const initialBadge = await screen.findByText("in sync");
    expect(initialBadge).toBeInTheDocument();

    const entityInput = screen.getByPlaceholderText("Enter entity name");
    await clickClearType(user, entityInput, "Order");

    const keyInput = screen.getByPlaceholderText("e.g. name");
    await clickClearType(user, keyInput, "email");

    const badgeNotInSync = await screen.findByText("not in sync");
    expect(badgeNotInSync).toBeInTheDocument();

    const valueTypeCombobox = screen.getByRole("combobox");
    await user.type(valueTypeCombobox, "email");
    const emailOption = screen.getByRole("option", { name: "email" });
    await user.click(emailOption);

    const badgeStillNotInSync = await screen.findByText("not in sync");
    expect(badgeStillNotInSync).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText("not in sync")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    const generateButton = screen.getByRole("button", { name: /generate/i });
    await user.click(generateButton);

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
    await clickClearType(user, entityInput, "Order");
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
