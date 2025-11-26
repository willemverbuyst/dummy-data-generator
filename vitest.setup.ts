import "@testing-library/jest-dom";
import { afterAll, beforeAll } from "vitest";

// Suppress React 18 act warnings from third-party UI libraries (Radix UI)
// These occur due to async state updates in Select/Tooltip with internal timers
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: Parameters<typeof console.error>) => {
    const message = args[0]?.toString() || "";
    if (
      message.includes("not wrapped in act(...)") ||
      message.includes("Warning: An update to") ||
      message.includes("A component suspended inside an `act` scope")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
