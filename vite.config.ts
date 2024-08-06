/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import { configDefaults } from "vitest/config";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    UnoCSS(),
    checker({
      vueTsc: true
    }),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  // esbuild: {
  //   drop: ["console", "debugger"],
  // },
  test: {
    environment: "jsdom",
    setupFiles: [
      "./tests/unit/globalSetup.unit.ts",
    ],
    include: ["./tests/unit/**/*.{test,spec}.?(c|m)[jt]s"],
    exclude: [...configDefaults.exclude, "./tests/e2e/**"],
    root: fileURLToPath(new URL("./", import.meta.url)),
    reporters: ["default"],
    coverage: {
      // enabled: true,
      all: true,
      provider: "v8", // or 'instambul'
      include: ["src/**/*"],
      extension: [".js", ".ts", ".vue"],
      exclude: [
        ...configDefaults.coverage.exclude!,
        "src/main.ts",
        "src/router.ts",
        "src/config.ts",
        "src/index.d.ts",
        "src/typings/*.ts",
      ],
      reportsDirectory: "./test-results/vitest-coverage",
      reporter: ["json", "html"],
    }
  }
});
