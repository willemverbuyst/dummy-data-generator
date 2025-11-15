import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          test: {
            name: "unit",
            environment: "node",
            include: ["src/business/**/*.test.ts"],
          },
        },
        {
          test: {
            name: "component",
            environment: "happy-dom",
            include: ["src/components/**/*.test.tsx"],
            alias: {
              "@/": new URL("./src/", import.meta.url).pathname,
            },
            browser: {
              enabled: true,
              provider: playwright(),
              instances: [{ browser: "chromium" }],
            },
            server: {
              deps: {
                inline: true,
              },
            },
          },
        },
      ],
    },
  }),
);
