import { test, expect } from "@playwright/test";

test.describe("Theme button", () => {
  test("has button to change the app's theme mode", async({ page }) => {
    await page.goto("/", { waitUntil: "load" });

    await expect(page.getByRole("button", { name: "Dark Mode" })).toBeVisible();
  });

  test("change app's theme to dark mode clicking on theme button", async({ page }) => {
    await page.goto("/", { waitUntil: "load" });

    await page.getByRole("button", { name: "Dark Mode" }).click();

    await expect(page.getByRole("button", { name: "Light Mode" })).toBeVisible();
  });

  test("change app's theme to light mode clicking again on theme button", async({ page }) => {
    await page.goto("/", { waitUntil: "load" });

    await page.getByRole("button", { name: "Dark Mode" }).click();
    await page.getByRole("button", { name: "Light Mode" }).click();

    await expect(page.getByRole("button", { name: "Dark Mode" })).toBeVisible();
  });
});
