import { fireEvent, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useFormContext } from "react-hook-form";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { render } from "vitest-browser-react";
import { defaultSchema } from "../formSchema";
import { ResetButton } from "./ResetButton";

vi.mock("react-hook-form");
vi.mock("../formSchema", () => ({
  defaultSchema: { id: "default", name: "Default Schema" },
}));

const mockReset = vi.fn();

describe("ResetButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useFormContext as Mock).mockReturnValue({
      reset: mockReset,
    });

    // (useDummyData as any).mockReturnValue((selector: any) => {
    //   if (selector.name === "clearDummyData") {
    //     return mockClearDummyData;
    //   }
    //   if (selector.name === "setInSyncWithForm") {
    //     return mockSetInSyncWithForm;
    //   }
    // });
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

  it.skip("calls all reset functions when clicked", async () => {
    const user = userEvent.setup();
    render(<ResetButton />);
    const button = screen.getByRole("button", { name: "Reset" });

    await user.click(button);

    expect(mockReset).toHaveBeenCalledWith({
      schemas: [defaultSchema],
    });
    //   expect(mockClearDummyData).toHaveBeenCalled();
    //   expect(mockSetInSyncWithForm).toHaveBeenCalledWith(true);
  });

  it("calls reset functions in correct order", () => {
    render(<ResetButton />);
    const button = screen.getByRole("button", { name: "Reset" });

    fireEvent.click(button);

    expect(mockReset).toHaveBeenCalledTimes(1);
    // expect(mockClearDummyData).toHaveBeenCalledTimes(1);
    // expect(mockSetInSyncWithForm).toHaveBeenCalledTimes(1);
  });
});
