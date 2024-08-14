import { test, expect } from "@playwright/test";

test.describe("Logo", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/", { waitUntil: "load" });
  });

  test("has logo", async({ page }) => {
    await expect(page.getByRole("link", { name: "Logo" })).toBeVisible();
  });

  test("redirects to homepage on clicking on logo", async({ page }) => {
    await page.getByRole("link", { name: "Logo" }).click();

    await expect(page).toHaveURL("/movies");
  });
});
