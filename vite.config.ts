import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    "@": path.resolve(__dirname, "src"),
    eventsource:
      "./node_modules/sockjs-client/lib/transport/browser/eventsource.js",
    events: "./node_modules/sockjs-client/lib/event/emitter.js",
    crypto: "./node_modules/sockjs-client/lib/utils/browser-crypto.js",
  },

  define: {
    global: {},
  },
});
