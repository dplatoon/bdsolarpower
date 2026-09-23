import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Publishable backend values. Used only as a build-time fallback so the
// SSR/prerender step can construct the client when the deploy environment
// does not expose the VITE_ vars (otherwise the build crashes with
// "supabaseUrl is required").
const FALLBACK_SUPABASE_URL = "https://glihhthklgetvtezcqcp.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaWhodGhrbGdldHZ0ZXpjcWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NjQwNzUsImV4cCI6MjA3NzM0MDA3NX0.y5YwprmjZKTz_caCEpC-yLC8QwqDDMWoTHQuIqndT9o";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const define: Record<string, string> = {};
  if (!env.VITE_SUPABASE_URL) {
    define["import.meta.env.VITE_SUPABASE_URL"] = JSON.stringify(FALLBACK_SUPABASE_URL);
  }
  if (!env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    define["import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY"] = JSON.stringify(
      FALLBACK_SUPABASE_PUBLISHABLE_KEY
    );
  }

  return {
  define,
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
