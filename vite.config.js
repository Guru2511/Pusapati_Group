import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import base44 from "@base44/vite-plugin";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// Every runtime dependency is bundled at startup, for the browser and the SSR worker: one first imported
// mid-session makes Vite re-bundle, and a page rendered meanwhile on the server loads a second React.
// Not listed: React itself, the TanStack Start/Router framework (its plugin bundles it) and build-time plugins.
const NOT_PREBUNDLED = new Set(["react", "react-dom", "@base44/vite-plugin", "@tanstack/react-start", "@tanstack/react-router", "@tanstack/react-router-ssr-query", "tailwindcss-animate"]);
const { dependencies } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const PREBUNDLE = Object.keys(dependencies).filter((name) => !NOT_PREBUNDLED.has(name));
const isVercel = process.env.VERCEL === "1";
const vercelPlatformShims = fileURLToPath(new URL("./src/lib/vercel-platform-shims.js", import.meta.url));

export default defineConfig({
  resolve: {
    alias: isVercel
      ? [
          { find: "base44:runtime", replacement: vercelPlatformShims },
          { find: "cloudflare:workers", replacement: vercelPlatformShims },
        ]
      : [],
  },
  optimizeDeps: { include: PREBUNDLE },
  environments: {
    ssr: {
      optimizeDeps: { include: PREBUNDLE },
      // Source maps for the Worker only, never served: they let Base44 point an error's stack at the app's own
      // files. Without the sources, so the app's code isn't copied into them. The browser build gets none.
      build: { sourcemap: true, rolldownOptions: { output: { sourcemapExcludeSources: true } } },
    },
  },
  plugins: [
    base44({
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: !isVercel,
      visualEditAgent: true,
    }),
    ...(isVercel
      ? [tanstackStart({ srcDirectory: "src" }), nitro()]
      : [
          // No inspector: a restarted dev server would race the old one for port 9229 and crash.
          cloudflare({ viteEnvironment: { name: "ssr" }, inspectorPort: false }),
          tanstackStart({ srcDirectory: "src" }),
        ]),
    react(),
  ],
});
