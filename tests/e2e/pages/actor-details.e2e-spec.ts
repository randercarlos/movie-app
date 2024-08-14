import { expect } from "@playwright/test";
import { test } from "#/e2e/globalSetup.e2e";

test.describe("Actor Details", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/actors/224", { waitUntil: "load" });
  });

  test("has poster, name, description and know for", async({ page }) => {
    await page.pause();
    await expect(page.getByRole("img", { name: "profile image" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Jason Momoa" })).toBeVisible();
    await expect(page.getByText("ago 01, 1979 (45 years old)  in Honolulu, Hawaii, USA"))
      .toBeVisible();
    await expect(page.getByText("Joseph Jason Namakaeha Momoa (born August 1, 1979) is an "
      + "American actor and")).toBeVisible();

    await expect(page.getByRole("link", { name: "poster" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "The Ellen DeGeneres Show", exact: true }).first())
      .toBeVisible();

    await expect(page.getByRole("link", { name: "poster" }).nth(1)).toBeVisible();
    await expect(page.getByRole("link", { name: "Conan the Barbarian", exact: true }).first())
      .toBeVisible();

    await expect(page.getByRole("link", { name: "Facebook" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Instagram" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Twitter" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Youtube" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Tiktok" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Wikipedia" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Website" })).toBeVisible();
  });

  test("has images from actor", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Images" })).toBeVisible();

    await expect(page.getByRole("link", { name: "images" })).toHaveCount(1);
  });

  test("open actor's image modal clicking on actor's image", async({ page }) => {
    await page.getByRole("link", { name: "images" }).first().click();

    await expect(page.locator("[data-test=\"actorImageModalImg\"]")).toBeVisible();
  });

  test("has credits", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Credits" })).toBeVisible();

    await expect(page.getByText("2011 · Conan the Barbarian as Conan")).toBeVisible();
    await expect(page.getByText("2003 · The Ellen DeGeneres")).toBeVisible();
  });

  test("redirects to movie's detail page clicking on actor's movie credit", async({ page }) => {
    await page.locator("li").filter({ hasText: "· Conan the Barbarian as Conan" })
      .getByRole("link").click();

    await expect(page).toHaveURL(new RegExp("movies/\\d+"));
  });

  test("redirects to tv show's detail page clicking on actor's tv show credit", async({ page }) => {
    await page.locator("li").filter({ hasText: "2003 · The Ellen DeGeneres" }).getByRole("link")
      .click();

    await expect(page).toHaveURL(new RegExp("tv-shows/\\d+"));
  });
});
