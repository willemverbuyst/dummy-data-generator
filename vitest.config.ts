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
            globals: true,
            name: "component",
            environment: "happy-dom",
            setupFiles: ["./vitest.setup.ts"],
            include: ["src/components/**/*.test.tsx"],
            alias: {
              "@/": new URL("./src/", import.meta.url).pathname,
            },
          },
        },
      ],
    },
  }),
);
