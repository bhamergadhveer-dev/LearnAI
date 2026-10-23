import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  vite: { server: { proxy: { "/api": "http://127.0.0.1:5000" } } },
});
