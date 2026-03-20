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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-hook-form")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/antd")) {
            return "vendor-ui";
          }
          if (id.includes("node_modules/zod") || id.includes("node_modules/zustand")) {
            return "vendor-utils";
          }
          return undefined;
        },
      },
    },
  },
});
