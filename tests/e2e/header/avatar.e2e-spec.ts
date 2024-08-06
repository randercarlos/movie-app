import { test, expect } from "@playwright/test";

test.describe("Avatar", () => {
  test("has user's avatar", async({ page }) => {
    await page.goto("/", { waitUntil: "load" });

    await expect(page.getByRole("link", { name: "avatar" })).toBeVisible();
  });
});
