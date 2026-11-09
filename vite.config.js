import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

/**
 * GitHub Pages (and most static hosts) return a real 404 for unknown paths,
 * which breaks deep links like `/<base>/booking` on hard refresh.
 * Copying the built index.html to 404.html lets the SPA boot and let
 * React Router resolve the route from the current URL.
 */
function spaFallbackPlugin() {
  return {
    name: "spa-404-fallback",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, "dist");
      fs.copyFileSync(
        path.join(outDir, "index.html"),
        path.join(outDir, "404.html")
      );
    },
  };
}

export default defineConfig({
  /*
   * Public base path.
   * - GitHub Pages serves the site from a sub-path: /<repo>/ (set via
   *   VITE_BASE_PATH in the deploy workflow).
   * - Vercel / local preview serve from the root, so the default is "/".
   */
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss(), spaFallbackPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@config": path.resolve(import.meta.dirname, "./src/config"),
      "@content": path.resolve(import.meta.dirname, "./src/content"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@pages": path.resolve(import.meta.dirname, "./src/pages"),
      "@utils": path.resolve(import.meta.dirname, "./src/utils"),
      "@hooks": path.resolve(import.meta.dirname, "./src/hooks"),
    },
  },
});
