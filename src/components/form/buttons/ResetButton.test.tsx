import { useDummyData, type State } from "@/zustand/store";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormContext } from "react-hook-form";
import type { Mock } from "vitest";
import { defaultSchema } from "../formSchema";
import { ResetButton } from "./ResetButton";

vi.mock("react-hook-form");
vi.mock("../formSchema", () => ({
  defaultSchema: { id: "default", name: "Default Schema" },
}));
vi.mock("@/zustand/store");

const resetMock = vi.fn();
const setInSyncWithFormMock = vi.fn();
const clearDummyDataMock = vi.fn();

describe("ResetButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useFormContext as Mock).mockReturnValue({
      reset: resetMock,
    });

    (useDummyData as unknown as Mock).mockImplementation(
      (selector: (state: State) => unknown) => {
        const state = {
          clearDummyData: clearDummyDataMock,
          setInSyncWithForm: setInSyncWithFormMock,
        } as unknown as State;
        return selector(state);
      },
    );
  });

  it("renders reset button with correct text", () => {
    render(<ResetButton />);
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("has correct button attributes", () => {
    render(<ResetButton />);
    const button = screen.getByRole("button", { name: "Reset" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("calls all reset functions when clicked", async () => {
    const user = userEvent.setup();
    render(<ResetButton />);
    const button = screen.getByRole("button", { name: "Reset" });

    await user.click(button);

    await waitFor(() => {
      expect(resetMock).toHaveBeenCalledWith({
        schemas: [defaultSchema],
      });
      expect(clearDummyDataMock).toHaveBeenCalled();
      expect(setInSyncWithFormMock).toHaveBeenCalledWith(true);
    });
  });

  it("calls reset functions in correct order", async () => {
    const user = userEvent.setup();
    render(<ResetButton />);
    const button = screen.getByRole("button", { name: "Reset" });

    await user.click(button);

    await waitFor(() => {
      expect(resetMock).toHaveBeenCalledTimes(1);
      expect(clearDummyDataMock).toHaveBeenCalledTimes(1);
      expect(setInSyncWithFormMock).toHaveBeenCalledTimes(1);
    });
  });
});
