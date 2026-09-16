import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Only pin the framework/runtime chunks. Everything else keeps Rollup's
        // natural splitting, so deps used only by lazy routes stay in those
        // route chunks instead of being dragged into the initial load.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("@supabase")) return "vendor-supabase";
          if (
            id.includes("node_modules/react/") ||
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("react-helmet-async") ||
            id.includes("scheduler")
          ) {
            return "vendor-react";
          }
          return undefined;
        },
      },
    },
  },
  ssr: {
    // CJS-only deps must be bundled for the build-time prerender to import them.
    noExternal: ["react-helmet-async"],
  },
}));
