import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://it.wikipedia.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/wikimedia": {
        target: "https://api.wikimedia.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wikimedia/, "")
      }
    },
  },
});
