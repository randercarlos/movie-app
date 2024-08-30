import { test, expect } from "@playwright/test";

test.describe("Footer", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/movies", { waitUntil: "load" });
  });

  test("has TMDB link", async({ page }) => {
    await expect(page.getByRole("link", { name: "TMDb API" })).toBeVisible();
  });

  test("has created by link", async({ page }) => {
    await expect(page.getByRole("link", { name: "Rander Carlos" })).toBeVisible();
  });
});
