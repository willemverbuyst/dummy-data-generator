import { render, screen } from "@testing-library/react";
import { OutputCard } from "./OutputCard";

// Mock the store
vi.mock("@/zustand/store", () => ({
	useDummyData: vi.fn(),
}));

// Mock the child components
vi.mock("../Spinner", () => ({
	Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock("./DataDisplay", () => ({
	DataDisplay: () => <div data-testid="data-display">Data Display</div>,
}));

vi.mock("./InSyncBadge", () => ({
	InSyncBadge: () => <div data-testid="in-sync-badge">In Sync</div>,
}));

const mockUseDummyData = vi.mocked(
	await import("@/zustand/store"),
).useDummyData;

describe("OutputCard", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders spinner when isGenerating is true", () => {
		vi.mocked(mockUseDummyData).mockReturnValue(true);

		render(<OutputCard />);

		expect(screen.getByTestId("spinner")).toBeInTheDocument();
		expect(screen.queryByTestId("in-sync-badge")).not.toBeInTheDocument();
		expect(screen.queryByTestId("data-display")).not.toBeInTheDocument();
	});

	it("renders InSyncBadge and DataDisplay when isGenerating is false", () => {
		vi.mocked(mockUseDummyData).mockReturnValue(false);

		render(<OutputCard />);

		expect(screen.getByTestId("in-sync-badge")).toBeInTheDocument();
		expect(screen.getByTestId("data-display")).toBeInTheDocument();
		expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
	});
});
