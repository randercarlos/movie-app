import { expect } from "@playwright/test";
import { test } from "#/e2e/globalSetup.e2e";

test.describe("Movie Details", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/movies/823464", { waitUntil: "load" });
  });

  test("has poster, title, metadata, description, crew and play trailer", async({ page }) => {
    await expect(page.getByRole("img", { name: "poster" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Godzilla x Kong: The New Empire" }))
      .toBeVisible();
    await expect(page.getByText("72.83%")).toBeVisible();
    await expect(page.getByText("mar 27, 2024")).toBeVisible();
    await expect(page.getByText("Science Fiction, Action")).toBeVisible();
    await expect(page.getByText("Following their explosive showdown, Godzilla")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Featured Crew" })).toBeVisible();

    await expect(page.getByText("Adam Wingard")).toBeVisible();
    await expect(page.getByText("Director")).toBeVisible();

    await expect(page.getByRole("button", { name: "Play Trailer" })).toBeVisible();
  });

  test("open movie's trailer modal clicking on 'play trailer' button", async({ page }) => {
    await page.getByRole("button", { name: "Play Trailer" }).click();

    await expect(page.locator("#movieTrailerModal")).toBeVisible();
    await expect(page.frameLocator("iframe").getByLabel("Play", { exact: true })).toBeVisible();
  });

  test("has cast with images and names", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Cast" })).toBeVisible();

    await expect(page.getByRole("link", { name: "actor1" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Rebecca Hall" })).toBeVisible();
    await expect(page.getByText("Dr. Ilene Andrews")).toBeVisible();
  });

  test("redirects to actor's detail page clicking on actor's image in Cast", async({ page }) => {
    await page.getByRole("link", { name: "actor1" }).first().click();

    await expect(page).toHaveURL(new RegExp("actors/\\d+"));
  });

  test("redirects to actor's detail page clicking on actor's name in Cast", async({ page }) => {
    await page.getByRole("link", { name: "Rebecca Hall" }).click();

    await expect(page).toHaveURL(new RegExp("actors/\\d+"));
  });

  test("has images", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Images" })).toBeVisible();

    await expect(page.locator(".movie-images > div > .grid > div > a")).toHaveCount(1);
  });

  test("open movie's image modal clicking on movie's image in Images", async({ page }) => {
    await page.locator(".movie-images > div > .grid > div > a").first().click();

    await expect(page.locator("[data-test=\"movieImageModalImg\"]")).toBeVisible();
  });

});
