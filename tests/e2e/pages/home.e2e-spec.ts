import { expect } from "@playwright/test";
import { test } from "#/e2e/globalSetup.e2e";

test.describe("Home", () => {
  test("redirects to /movies URL", async({ page }) => {
    await page.goto("/", { waitUntil: "load" });

    await expect(page).toHaveURL(new RegExp("movies$"));
  });
});
