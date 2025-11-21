import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        include: ["src/**/*.{ts,tsx}"],
        exclude: [
          "src/**/*.test.{ts,tsx}",
          "src/components/ui/*.{ts,tsx}", // Shadcn UI components
          "src/main.tsx",
          "src/vite-env.d.ts",
          "**/*.config.{ts,js}",
          "**/types.ts",
        ],
      },
      projects: [
        {
          test: {
            globals: true,
            name: "unit",
            environment: "node",
            include: ["src/lib/**/*.test.ts"],
          },
        },
        {
          test: {
            globals: true,
            name: "component",
            environment: "happy-dom",
            setupFiles: ["./vitest.setup.ts"],
            include: ["src/components/**/*.test.{ts,tsx}"],
            alias: {
              "@/": new URL("./src/", import.meta.url).pathname,
            },
          },
        },
        {
          test: {
            globals: true,
            name: "integration",
            environment: "happy-dom",
            setupFiles: ["./vitest.setup.ts"],
            include: ["tests/**/*.test.tsx"],
            alias: {
              "@/": new URL("./src/", import.meta.url).pathname,
            },
          },
        },
      ],
    },
  }),
);
