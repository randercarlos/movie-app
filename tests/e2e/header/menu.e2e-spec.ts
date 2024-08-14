import { test, expect } from "@playwright/test";

test.describe("Menu", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/", { waitUntil: "load" });
  });

  test("has menu links", async({ page }) => {
    await expect(page.getByRole("link", { name: "Movies" })).toBeVisible();
    await expect(page.getByRole("link", { name: "TV Shows" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Actors" })).toBeVisible();
  });

  test("goes to movies page on clicking on 'Movies' menu link", async({ page }) => {
    await page.getByRole("link", { name: "Movies" }).click();

    await expect(page).toHaveURL(/.*movies/);
  });

  test("goes to tv shows page on clicking on 'TV Shows' menu link", async({ page }) => {
    await page.getByRole("link", { name: "TV Shows" }).click();

    await expect(page).toHaveURL(/.*tv-shows/);
  });

  test("goes to tv shows page on clicking on 'Actors' menu link", async({ page }) => {
    await page.getByRole("link", { name: "Actors" }).click();

    await expect(page).toHaveURL(/.*actors/);
  });
});
