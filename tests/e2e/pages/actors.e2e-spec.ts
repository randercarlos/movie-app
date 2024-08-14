import { expect } from "@playwright/test";
import { test } from "#/e2e/globalSetup.e2e";

test.describe("Actors", () => {

  test.beforeEach(async({ page }) => {
    // Ajustar o tamanho da janela para evitar que o rodapé esteja visível
    // e não
    await page.setViewportSize({ width: 800, height: 600 });

    await page.goto("/actors", { waitUntil: "load" });
  });

  test("show popular actors", async({ page }) => {
    await expect(page.getByRole("heading", { name: "Popular Actors" })).toBeVisible();

    const popularActors = await page.locator(".popular-actors");

    await expect(popularActors.locator(".actor > a > img").first()).toBeVisible();
    await expect(popularActors.getByRole("link", { name: "Jeremy Piven" }).first())
      .toBeVisible();
    await expect(popularActors.getByText("Cars, Serendipity, So Undercover").first()).toBeVisible();

    await expect(popularActors.locator(".actor > a > img").nth(1)).toBeVisible();
    await expect(popularActors.getByRole("link", { name: "Gabriel Guevara" }).first())
      .toBeVisible();

    await expect(popularActors.locator(".actor > a > img").nth(2)).toBeVisible();
    await expect(popularActors.getByRole("link", { name: "Jennifer Connelly" }).first())
      .toBeVisible();
    await expect(popularActors.getByText("A Beautiful Mind, Requiem for").first())
      .toBeVisible();
  });

  test("go to actor details clicking on actor's poster", async({ page }) => {
    const popularActors = await page.locator(".popular-actors");

    await popularActors.locator(".actor > a > img").first().click();

    await expect(page).toHaveURL(new RegExp("actors/\\d+"));
  });

  test("go to actor details clicking on actor's name", async({ page }) => {
    const popularActors = await page.locator(".popular-actors");

    await popularActors.getByRole("link", { name: "Jeremy Piven" }).first().click();

    await expect(page).toHaveURL(new RegExp("actors/\\d+"));
  });

  test("loads more actors on scroll down", async({ page }) => {

    const popularActors = await page.locator(".popular-actors");

    await page.pause();

    // Scroll down até o final da página
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await expect(popularActors.locator(".actor > a > img")).toHaveCount(18);
  });


});
