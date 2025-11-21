import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";

// Helper component to test the context
function ThemeConsumer() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear all document classes
    document.documentElement.className = "";
  });

  it("should render children", () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Test Child</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should use default theme 'light' when no theme in localStorage", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
  });

  it("should use theme from localStorage when available", () => {
    localStorage.setItem("vite-ui-theme", "dark");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  it("should use custom defaultTheme prop", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  it("should use custom storageKey prop", () => {
    localStorage.setItem("custom-theme-key", "dark");

    render(
      <ThemeProvider storageKey="custom-theme-key">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  it("should add theme class to document root", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("should update theme class when theme changes", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    const user = userEvent.setup();

    expect(document.documentElement.classList.contains("light")).toBe(true);

    await user.click(screen.getByText("Set Dark"));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("should persist theme to localStorage when changed", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    const user = userEvent.setup();

    await user.click(screen.getByText("Set Dark"));

    expect(localStorage.getItem("vite-ui-theme")).toBe("dark");
  });

  it("should persist theme to custom storageKey when changed", async () => {
    render(
      <ThemeProvider storageKey="custom-key">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    const user = userEvent.setup();

    await user.click(screen.getByText("Set Dark"));

    expect(localStorage.getItem("custom-key")).toBe("dark");
  });

  it("should update context when setTheme is called", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    const user = userEvent.setup();

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");

    await user.click(screen.getByText("Set Dark"));

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");

    await user.click(screen.getByText("Set Light"));

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
  });

  it("should remove previous theme class when changing theme", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    const user = userEvent.setup();

    expect(document.documentElement.classList.contains("light")).toBe(true);

    await user.click(screen.getByText("Set Dark"));

    // Should only have 'dark' class, not both
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(document.documentElement.classList.length).toBe(1);
  });
});
