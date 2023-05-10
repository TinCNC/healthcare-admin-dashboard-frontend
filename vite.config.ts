// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Or for other frameworks:
// import { svelte } from "@sveltejs/vite-plugin-svelte";
// etc.
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import nodePolyfills from "rollup-plugin-node-polyfills";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Or svelte(), etc.
  resolve: {
    alias: {
      // src: "*",
      // prettier-ignore
      "@": path.resolve(__dirname, "src"),
      // prettier-ignore
      "api": path.resolve(__dirname, "src/api"),
      // prettier-ignore
      "components": path.resolve(__dirname, "src/components"),
      // prettier-ignore
      "context": path.resolve(__dirname, "src/context"),
      // prettier-ignore
      "interfaces": path.resolve(__dirname, "src/interfaces"),
      // prettier-ignore
      "pages": path.resolve(__dirname, "src/pages"),
      // prettier-ignore
      "utility": path.resolve(__dirname, "src/utility"),
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      assert: "assert",
      crypto: "crypto-browserify",
      util: "util",
      "near-api-js": "near-api-js/dist/near-api-js.js",
    },
  },
  define: {
    "process.env": process.env ?? {},
  },
  build: {
    target: "esnext",
    rollupOptions: {
      plugins: [nodePolyfills({ crypto: true })],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
    },
  },
});
