/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import { configDefaults } from "vitest/config";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    UnoCSS(),
    checker({
      vueTsc: true,
      eslint: {
        lintCommand: "pnpm run lint",
      }
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  test: {
    environment: "jsdom",
    include: ["./tests/unit/**/*.{test,spec}.?(c|m)[jt]s"],
    exclude: [...configDefaults.exclude, "./tests/e2e/**"],
    root: fileURLToPath(new URL("./", import.meta.url)),
    reporters: ["default"],  // generate HTML output and preview results of tests for vitest UI
    coverage: {
      enabled: true,
      provider: "v8", // or 'instambul'
      include: ["src/**/*"],
      exclude: [
        ...configDefaults.coverage.exclude!,
        "src/main.ts",
        "src/router.ts",
        "src/config.ts",
        "src/index.d.ts"
      ],
      reportsDirectory: "./tests-coverage",
      reporter: ["json", "html"],
    },
  }
});
