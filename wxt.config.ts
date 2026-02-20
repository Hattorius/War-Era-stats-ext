import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],

  manifest: {
    host_permissions: [
      "https://api.warerastats.io/*",
    ]
  },

  webExt: {
    disabled: true
  }
});
