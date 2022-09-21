import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";
import path from "path";

export default defineConfig({
  plugins: [react(), WindiCSS()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env": {
      BASE_URL: "http://42.192.65.59:9000/",
    },
  },
});
