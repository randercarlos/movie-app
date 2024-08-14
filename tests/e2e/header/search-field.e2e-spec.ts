import { expect } from "@playwright/test";
import { test } from "#/e2e/globalSetup.e2e";

test.describe("Search field", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/", { waitUntil: "load" });
  });

  test("has search field", async({ page }) => {
    await expect(page.getByPlaceholder("Search (Press '/' to focus)")).toBeVisible();
  });

  test("open search result pressing '/' keyboard button", async({ page }) => {
    // await page.keyboard.press("/");
    await page.getByRole("heading", { name: "Popular Movies" }).press("/");

    await expect(page.getByText("No results for \"\"")).toBeVisible();
  });

  test("open search result clicking on it", async({ page }) => {
    await page.getByPlaceholder("Search (Press '/' to focus)").click();

    await expect(page.getByText("No results for \"\"")).toBeVisible();
  });

  test("close search result pressing 'esc'", async({ page }) => {
    await page.getByPlaceholder("Search (Press '/' to focus)").click();
    await page.keyboard.press("Escape");

    await expect(page.getByText("No results for \"\"")).not.toBeVisible();
  });

  test("close search result pressing 'shift' and 'tab'", async({ page }) => {
    await page.getByPlaceholder("Search (Press '/' to focus)").click();
    await page.keyboard.press("Shift+Tab");

    await expect(page.getByText("No results for \"\"")).not.toBeVisible();
  });

  test("close search result pressing 'tab' on last item in search result", async({ page }) => {
    await page.getByPlaceholder("Search (Press '/' to focus)").click();
    await page.getByPlaceholder("Search (Press '/' to focus)").fill("titanic");

    // execute 8 tabs on each item result for 7 results from search 'titanic' in search field
    Array(8).forEach(async() => await page.keyboard.press("Tab"));

    await expect(page.getByRole("link", { name: "poster TESTE", exact: true }))
      .not.toBeVisible();
  });

  test("close search result clicking outside of search field",async({ page }) => {
    await page.getByPlaceholder("Search (Press '/' to focus)").click();
    await page.getByRole("heading", { name: "Popular Movies" }).click();

    await expect(page.getByRole("link", { name: "poster TESTE", exact: true }))
      .not.toBeVisible();
  });

  test("no search is done in search field with less than 3 characters", async({ page }) => {
    await page.getByPlaceholder("Search (Press '/' to focus)").click();

    for(const search in ["", "a", "b"]) {
      await page.getByPlaceholder("Search (Press '/' to focus)").fill(search);

      await expect(page.getByText(`No results for "${search}"`)).toBeVisible();
    }
  });

  test("search is done in search field with 3 characters or more", async({ page }) => {
    await page.getByPlaceholder("Search (Press '/' to focus)").click();
    await page.getByPlaceholder("Search (Press '/' to focus)").fill("teste");

    await expect(page.locator(".router-link-active")).toBeVisible();
  });

  test("shows no results for random words", async({ page }) => {
    // disable mock route for url "*/**/search/multi?query=*"
    await page.unroute("*/**/search/multi?query=*");

    await page.getByPlaceholder("Search (Press '/' to focus)").click();

    const search = "sdklfjsfjls";
    await page.getByPlaceholder("Search (Press '/' to focus)").fill(search);

    await expect(page.getByText(`No results for "${search}"`)).toBeVisible();
  });

  test("show search results for search 'titanic' in search field", async({ page }) => {
    await page.getByPlaceholder("Search (Press '/' to focus)").click();
    await page.getByPlaceholder("Search (Press '/' to focus)").fill("titanic");

    await expect(page.locator("li:nth-child(1) > .block")).toBeVisible();
  });
});
