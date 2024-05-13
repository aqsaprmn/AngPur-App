import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react(), process.env.NODE_ENV === "production" ? basicSsl() : null],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild:
    process.env.NODE_ENV !== "development"
      ? {
          drop: ["console", "debugger"],
        }
      : {},
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    target: "esnext", //browsers can handle the latest ES features,
  },
  server:
    process.env.NODE_ENV === "production"
      ? {}
      : {
          port: 8889,
          proxy: {  
            "/teeareport": {
              target: "https://dev.lrtosis.com:51166",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/teeareport/, ""),
              toProxy: true,
            },
            "/esoreport": {
              target: "https://dev.lrtosis.com:50206",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/esoreport/, ""),
              toProxy: true,
            },
          },
        },
});
