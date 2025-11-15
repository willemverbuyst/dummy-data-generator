import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: [
      "@testing-library/react",
      "@testing-library/user-event",
      "react/jsx-dev-runtime",
    ],
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
});
