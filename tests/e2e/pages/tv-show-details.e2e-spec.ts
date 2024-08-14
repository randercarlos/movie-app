import { expect } from "@playwright/test";
import { test } from "#/e2e/globalSetup.e2e";

test.describe("TV Shows Details", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/tv-shows/224", { waitUntil: "load" });
  });

  test("has poster, title, metadata, description, crew and play trailer", async({ page }) => {
    await expect(page.getByRole("img", { name: "poster" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Match of the Day" })).toBeVisible();
    await expect(page.getByText("71.97%")).toBeVisible();
    await expect(page.getByText("ago 22, 1964")).toBeVisible();
    await expect(page.getByText("Talk, News")).toBeVisible();
    await expect(page.getByText("BBC's football highlights and analysis. " +
      "The longest-running football")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Featured Crew" })).toBeVisible();

    await expect(page.getByText("John Tree")).toBeVisible();
    await expect(page.getByText("Original Series Creator")).toBeVisible();

    await expect(page.getByText("John Duo")).toBeVisible();
    await expect(page.getByText("Creator", { exact: true})).toBeVisible();

    await expect(page.getByText("Karina Berins")).toBeVisible();
    await expect(page.getByText("Actress")).toBeVisible();

    await expect(page.getByRole("button", { name: "Play Trailer" })).toBeVisible();
  });

  test("open tv shows's trailer modal clicking on 'play trailer' button", async({ page }) => {
    await page.getByRole("button", { name: "Play Trailer" }).click();

    await expect(page.locator("#tvShowTrailerModal")).toBeVisible();
    await expect(page.frameLocator("iframe").getByLabel("Play", { exact: true })).toBeVisible();
  });

  test("has cast with images and names", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Cast" })).toBeVisible();

    await expect(page.getByRole("link", { name: "actor1" }).first()).toBeVisible();
    await expect(page.getByText("Gary Lineker")).toBeVisible();
    await expect(page.getByText("Presenter").first()).toBeVisible();
  });

  test("redirects to actor's detail page clicking on actor's image in Cast", async({ page }) => {
    await page.getByRole("link", { name: "actor1" }).first().click();

    await expect(page).toHaveURL(new RegExp("actors/\\d+"));
  });

  test("redirects to actor's detail page clicking on actor's name in Cast", async({ page }) => {
    await page.getByRole("link", { name: "Gary Lineker" }).click();

    await expect(page).toHaveURL(new RegExp("actors/\\d+"));
  });

  test("has images", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Images" })).toBeVisible();

    await expect(page.locator(".tv-images > div > .grid > div > a")).toHaveCount(1);
  });

  test("open tv show's image modal clicking on tv show's image in Images", async({ page }) => {
    await page.locator(".tv-images > div > .grid > div > a").first().click();

    await expect(page.locator("[data-test=\"tvShowImageModalImg\"]")).toBeVisible();
  });

});
