import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/dummy-data-generator",
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "vendor-react",
              test: /node_modules[\\/]react|node_modules[\\/]react-dom|node_modules[\\/]react-hook-form/,
            },
            {
              name: "vendor-ui",
              test: /node_modules[\\/]antd/,
            },
            {
              name: "vendor-utils",
              test: /node_modules[\\/]zod|node_modules[\\/]zustand/,
            },
          ],
        },
      },
    },
  },
});
