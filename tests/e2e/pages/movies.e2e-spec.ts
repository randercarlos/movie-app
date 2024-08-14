import { expect } from "@playwright/test";
import { test } from "#/e2e/globalSetup.e2e";

test.describe("Movies", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/movies", { waitUntil: "load" });
  });

  test("show popular movies", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Popular Movies" })).toBeVisible();

    const popularMovies = await page.locator(".popular-movies");

    await expect(popularMovies.getByRole("link", { name: "poster" }).first()).toBeVisible();
    await expect(popularMovies.getByRole("link", { name: "Inside Out" }).first()).toBeVisible();
    await expect(popularMovies.getByText("77.08%").first()).toBeVisible();
    await expect(popularMovies.getByText("jun 11, 2024").first()).toBeVisible();
    await expect(popularMovies.getByText("Adventure, Animation, Drama, Comedy, Family").first())
      .toBeVisible();

    await expect(popularMovies.getByRole("link", { name: "poster" }).nth(1)).toBeVisible();
    await expect(popularMovies.getByRole("link", { name: "Despicable Me" }).first()).toBeVisible();
    await expect(popularMovies.getByText("76.13%").first()).toBeVisible();
    await expect(popularMovies.getByText("jun 20, 2024").first()).toBeVisible();
    await expect(popularMovies.getByText("Animation, Action, Comedy, Family").first())
      .toBeVisible();
  });

  test("show now playing movies", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Now Playing" })).toBeVisible();

    const nowPlayingMovies = await page.locator(".now-playing-movies");

    await expect(nowPlayingMovies.getByRole("link", { name: "poster" }).first()).toBeVisible();
    await expect(nowPlayingMovies.getByRole("link", { name: "Inside Out" }).first()).toBeVisible();
    await expect(nowPlayingMovies.getByText("77.09%")).toBeVisible();
    await expect(nowPlayingMovies.getByText("jun 11, 2024").first()).toBeVisible();
    await expect(nowPlayingMovies.getByText("Adventure, Animation, Drama, Comedy, Family").first())
      .toBeVisible();

    await expect(nowPlayingMovies.getByRole("link", { name: "poster" }).nth(1)).toBeVisible();
    await expect(nowPlayingMovies.getByRole("link", { name: "Despicable Me" }).first())
      .toBeVisible();
    await expect(nowPlayingMovies.getByText("76.13%").first()).toBeVisible();
    await expect(nowPlayingMovies.getByText("jun 20, 2024").first()).toBeVisible();
    await expect(nowPlayingMovies.getByText("Animation, Action, Comedy, Family").first())
      .toBeVisible();
  });

  test("go to movie details clicking on movie's poster", async({ page }) => {
    await page.getByRole("link", { name: "poster"  }).first().click();

    await expect(page).toHaveURL(new RegExp("movies/\\d+"));
  });

  test("go to movie details clicking on movie's title", async({ page }) => {
    await page.getByRole("link", { name: "Inside Out" }).first().click();

    await expect(page).toHaveURL(new RegExp("movies/\\d+"));
  });
});
