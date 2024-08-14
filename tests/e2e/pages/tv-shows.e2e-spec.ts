import { expect } from "@playwright/test";
import { test } from "#/e2e/globalSetup.e2e";

test.describe("TV Shows", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/tv-shows", { waitUntil: "load" });
  });

  test("show popular tv shows", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Popular Shows" })).toBeVisible();

    const popularShows = await page.locator(".popular-shows");

    await expect(popularShows.getByRole("link", { name: "poster" }).first()).toBeVisible();
    await expect(popularShows.getByRole("link", { name: "House of the Dragon" }).first())
      .toBeVisible();
    await expect(popularShows.getByText("84.16%").first()).toBeVisible();
    await expect(popularShows.getByText("ago 21, 2022").first()).toBeVisible();
    await expect(popularShows.getByText("Drama, Action & Adventure, Sci-Fi & Fantasy").first())
      .toBeVisible();

    await expect(popularShows.getByRole("link", { name: "poster" }).nth(1)).toBeVisible();
    await expect(popularShows.getByRole("link", { name: "The Boys" }).first()).toBeVisible();
    await expect(popularShows.getByText("84.73%").first()).toBeVisible();
    await expect(popularShows.getByText("jul 25, 2019").first()).toBeVisible();
    await expect(popularShows.getByText("Action & Adventure, Sci-Fi & Fantasy").first())
      .toBeVisible();
  });

  test("show top rated tv shows", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Top Rated Shows" })).toBeVisible();

    const topRatedShows = await page.locator(".top-rated-shows");

    await expect(topRatedShows.getByRole("link", { name: "poster" }).first()).toBeVisible();
    await expect(topRatedShows.getByRole("link", { name: "Hazbin Hotel" }).first()).toBeVisible();
    await expect(topRatedShows.getByText("89.7%")).toBeVisible();
    await expect(topRatedShows.getByText("jan 18, 2024").first()).toBeVisible();
    await expect(topRatedShows.getByText("Animation, Comedy, Sci-Fi & Fantasy").first())
      .toBeVisible();

    await expect(topRatedShows.getByRole("link", { name: "poster" }).nth(1)).toBeVisible();
    await expect(topRatedShows.getByRole("link", { name: "Frieren: Beyond Journey's End" }).first())
      .toBeVisible();
    await expect(topRatedShows.getByText("89%").first()).toBeVisible();
    await expect(topRatedShows.getByText("set 29, 2023").first()).toBeVisible();
    await expect(topRatedShows.getByText("Animation, Drama, Action & Adventure, Sci-Fi & Fantasy")
      .first()).toBeVisible();
  });

  test("go to tv show details clicking on tv show's poster", async({ page }) => {
    await page.getByRole("link", { name: "poster" }).first().click();

    await expect(page).toHaveURL(new RegExp("tv-shows/\\d+"));
  });

  test("go to tv show details clicking on tv show's title", async({ page }) => {
    await page.getByRole("link", { name: "House of the Dragon"  }).first().click();

    await expect(page).toHaveURL(new RegExp("tv-shows/\\d+"));
  });
});
