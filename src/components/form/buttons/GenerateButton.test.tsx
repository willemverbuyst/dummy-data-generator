import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { GenerateButton } from "./GenerateButton";

describe("GenerateButton", () => {
  it("renders with correct text", () => {
    render(<GenerateButton />);
    expect(
      screen.getByRole("button", { name: "Generate" }),
    ).toBeInTheDocument();
  });

  it("has submit type", () => {
    render(<GenerateButton />);
    const button = screen.getByRole("button", { name: "Generate" });
    expect(button).toHaveAttribute("type", "submit");
  });
});
