import { generateDummyData } from "@/lib/generators/generateDummyData";
import { useDummyData, type State } from "@/zustand/store";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormContext } from "react-hook-form";
import type { Mock } from "vitest";
import { ShowExampleButton } from "./ShowExampleButton";

vi.mock("react-hook-form");
vi.mock("@/zustand/store");
vi.mock("@/lib/generators/generateDummyData");
vi.mock("@/exampleInput", () => ({
  exampleInput: { some: "input" },
}));

const mockReset = vi.fn();
const mockSetDummyData = vi.fn();
const mockSetIsGenerating = vi.fn();
const mockSetInSyncWithForm = vi.fn();

describe("ShowExampleButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useFormContext as Mock).mockReturnValue({
      reset: mockReset,
    });

    (useDummyData as unknown as Mock).mockImplementation(
      (selector: (state: State) => unknown) => {
        const state = {
          setIsGenerating: mockSetIsGenerating,
          setInSyncWithForm: mockSetInSyncWithForm,
          setDummyData: mockSetDummyData,
        } as unknown as State;
        return selector(state);
      },
    );

    (generateDummyData as Mock).mockReturnValue({ test: "data" });
  });

  it("renders the button with correct text", () => {
    render(<ShowExampleButton />);
    expect(screen.getByRole("button", { name: "Example" })).toBeInTheDocument();
  });

  it("has correct button attributes", () => {
    render(<ShowExampleButton />);
    const button = screen.getByRole("button", { name: "Example" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("calls all required functions when clicked", async () => {
    const user = userEvent.setup();
    render(<ShowExampleButton />);
    const button = screen.getByRole("button", { name: "Example" });

    await user.click(button);
    expect(mockSetIsGenerating).toHaveBeenCalledWith(true);

    // Wait for React state updates to complete
    await waitFor(
      () => {
        expect(generateDummyData).toHaveBeenCalledWith({ some: "input" });
        expect(mockSetDummyData).toHaveBeenCalledWith({ test: "data" });
        expect(mockReset).toHaveBeenCalledWith({ schemas: { some: "input" } });
        expect(mockSetInSyncWithForm).toHaveBeenCalledWith(true);
        expect(mockSetIsGenerating).toHaveBeenCalledWith(false);
      },
      { timeout: 500 },
    );
  });

  it("calls functions in correct order", async () => {
    const user = userEvent.setup();
    render(<ShowExampleButton />);
    const button = screen.getByRole("button", { name: "Example" });

    await user.click(button);

    expect(mockSetIsGenerating).toHaveBeenNthCalledWith(1, true);

    await waitFor(
      () => {
        expect(mockSetIsGenerating).toHaveBeenNthCalledWith(2, false);
      },
      { timeout: 500 },
    );
  });
});
