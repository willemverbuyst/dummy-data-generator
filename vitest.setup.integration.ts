import "@testing-library/jest-dom";
import { afterAll, beforeAll, vi } from "vitest";

// Suppress React 18 act warnings from Radix UI Select/Tooltip components
// These warnings occur due to async state updates in Radix UI's internal
// positioning/animation systems (Floating UI) that are outside our control.
// The test properly uses async queries (findBy*, waitFor) and waits for interactions.
// See: https://github.com/radix-ui/primitives/issues/1816
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

  // stackoverflow.com/questions/79790413/how-to-avoid-target-haspointercapture-is-not-a-function-when-testing-radix-ui-s

  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = vi.fn().mockReturnValue(false);
  }
});

afterAll(() => {
  console.error = originalError;
});
