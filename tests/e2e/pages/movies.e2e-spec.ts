import { expect } from "@playwright/test";
import { test } from "#/e2e/globalSetup.e2e";

test.describe("Movies", () => {
  test("has popular movies and now playing movies titles", async({ page }) => {
    await page.goto("/movies", { waitUntil: "load" });

    await expect(page.getByRole("heading", { name: "Popular Movies" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Now Playing" })).toBeVisible();
  });

  test("movie's card has poster, title and details", async({ page }) => {
    await page.goto("/movies", { waitUntil: "load" });

    await expect(page.getByRole("heading", { name: "Popular Movies" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Now Playing" })).toBeVisible();
  });

  test("show popular movies", async({ page }) => {
    await page.goto("/movies", { waitUntil: "load" });

    await expect(page.getByRole("link", { name: "poster"  }).nth(0)).toBeVisible();
    await expect(page.getByRole("link", { name: "poster"  }).nth(1)).toBeVisible();

    await expect(page.getByRole("link", { name: "Inside Out" }).nth(0)).toBeVisible();
    await expect(page.getByRole("link", { name: "Despicable Me" }).nth(0)).toBeVisible();
  });

  test("show now playing movies", async({ page }) => {
    await page.goto("/movies", { waitUntil: "load" });

    await expect(page.getByRole("link", { name: "poster"  }).nth(2)).toBeVisible();
    await expect(page.getByRole("link", { name: "poster"  }).nth(3)).toBeVisible();

    await expect(page.getByRole("link", { name: "Inside Out" }).nth(1)).toBeVisible();
    await expect(page.getByRole("link", { name: "Despicable Me" }).nth(1)).toBeVisible();
  });

  test("go to movie details clicking on movie's poster", async({ page }) => {
    await page.goto("/movies", { waitUntil: "load" });

    await page.getByRole("link", { name: "poster"  }).first().click();

    await expect(page).toHaveURL(new RegExp("movies/\\d+"));
  });

  test("go to movie details clicking on movie's title", async({ page }) => {
    await page.goto("/movies", { waitUntil: "load" });

    await page.getByRole("link", { name: "Inside Out" }).first().click();

    await expect(page).toHaveURL(new RegExp("movies/\\d+"));
  });
});
