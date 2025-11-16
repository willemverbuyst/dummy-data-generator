import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataDisplay } from "./DataDisplay";

// Mock the zustand store
vi.mock("@/zustand/store", () => ({
  useDummyData: vi.fn(),
}));

const mockUseDummyData = vi.mocked(
  await import("@/zustand/store"),
).useDummyData;

describe("DataDisplay", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dummy data as formatted JSON", () => {
    const mockData = { name: "test", value: 123 };
    mockUseDummyData.mockReturnValue(mockData);

    render(<DataDisplay />);

    const codeElement = screen.getByText((content, element) => {
      return (
        element?.tagName === "CODE" &&
        content.includes('"name": "test"') &&
        content.includes('"value": 123')
      );
    });
    expect(codeElement).toBeInTheDocument();
  });

  it("renders empty object when dummy data is empty", () => {
    const mockData = {};
    mockUseDummyData.mockReturnValue(mockData);

    render(<DataDisplay />);

    const codeElement = screen.getByText((content, element) => {
      return element?.tagName === "CODE" && content.trim() === "{}";
    });
    expect(codeElement).toBeInTheDocument();
  });

  it("renders complex nested data structure", () => {
    const mockData = {
      users: [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ],
      settings: { theme: "dark" },
    };
    mockUseDummyData.mockReturnValue(mockData);

    render(<DataDisplay />);

    const codeElement = screen.getByText((content, element) => {
      return (
        element?.tagName === "CODE" &&
        content.includes('"users"') &&
        content.includes('"John"') &&
        content.includes('"Jane"') &&
        content.includes('"theme": "dark"')
      );
    });
    expect(codeElement).toBeInTheDocument();
  });
});
