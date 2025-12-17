import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { ThemeProviderContext } from "./ThemeProviderContext";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
	it("should throw error when used outside ThemeProvider", () => {
		expect(() => {
			renderHook(() => useTheme());
		}).toThrow("useTheme must be used within a ThemeProvider");
	});

	it("should return context value when used within ThemeProvider", () => {
		const mockContextValue: React.ContextType<typeof ThemeProviderContext> = {
			theme: "light",
			setTheme: () => {},
		};

		const wrapper = ({ children }: { children: ReactNode }) => (
			<ThemeProviderContext.Provider value={mockContextValue}>
				{children}
			</ThemeProviderContext.Provider>
		);

		const { result } = renderHook(() => useTheme(), { wrapper });

		expect(result.current).toBe(mockContextValue);
	});
});
