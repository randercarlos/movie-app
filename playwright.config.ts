import process from "node:process";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,  // limit workers to prevent parallelism and timeout
  reporter: [
    ["list"],
    ["html", { outputFolder: "./test-results/playwright-report"}]
  ],
  expect: {
    timeout: 10 * 1000, // increase timeout for expect
  },
  use: {
    baseURL: process.env.VITE_BASE_URL,
    trace: "on-first-retry",
    launchOptions: {
      slowMo: 1000
    }
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"]
      }
    },
    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"]
    //   }
    // },
    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     channel: "msedge",
    //   },
    // },
    // {
    //   name: "Google Chrome",
    //   use: {
    //     channel: "chrome",
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
  ],
  outputDir: "test-results",
  webServer: {
    command: process.env.CI ? "pnpm run preview" : "pnpm run dev",
    port: 5173,
    reuseExistingServer: !process.env.CI
  }
});
