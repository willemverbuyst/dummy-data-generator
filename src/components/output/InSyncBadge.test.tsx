import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InSyncBadge } from "./InSyncBadge";

// Mock the zustand store
vi.mock("@/zustand/store", () => ({
  useDummyData: vi.fn(),
}));

const mockUseDummyData = vi.mocked(
  await import("@/zustand/store"),
).useDummyData;

describe("InSyncBadge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 'in sync' badge when form is in sync", () => {
    mockUseDummyData.mockReturnValue(true);

    render(<InSyncBadge />);

    const badge = screen.getByText("in sync");
    expect(badge).toBeInTheDocument();
  });

  it("renders 'not in sync' badge when form is out of sync", () => {
    mockUseDummyData.mockReturnValue(false);

    render(<InSyncBadge />);

    const badge = screen.getByText("not in sync");
    expect(badge).toBeInTheDocument();
  });

  it("shows correct tooltip content when in sync", async () => {
    mockUseDummyData.mockReturnValue(true);

    render(<InSyncBadge />);
    const user = userEvent.setup();

    const badge = screen.getByText("in sync");
    await user.hover(badge);

    await waitFor(async () => {
      const tooltip = await screen.findByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("Form and json are in sync");
    });
  });

  it("shows correct tooltip content when out of sync", async () => {
    mockUseDummyData.mockReturnValue(false);

    render(<InSyncBadge />);

    const user = userEvent.setup();

    const badge = screen.getByText("not in sync");
    await user.hover(badge);

    await waitFor(async () => {
      const tooltip = await screen.findByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("Form and json are out of sync");
      expect(tooltip).toHaveTextContent("Press the Generate button to sync");
    });
  });
});
