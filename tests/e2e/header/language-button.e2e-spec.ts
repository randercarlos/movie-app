import { test, expect } from "@playwright/test";

test.describe("Language button", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/", { waitUntil: "load" });
  });

  test("has button to change the app's language", async({ page }) => {
    await expect(page.getByRole("button", { name: "Mudar idioma para Português" }))
      .toBeVisible();
  });

  test("change app's language to pt-BR clicking on language's button", async({ page }) => {
    await page.getByRole("button", { name: "Mudar idioma para Português" }).click();

    await expect(page.getByRole("button", { name: "Change idiom to English" })).toBeVisible();

    await expect(page.getByRole("link", { name: "Filmes" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Séries" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Artistas" })).toBeVisible();

    await expect(page.getByRole("button", { name: "Modo Escuro" })).toBeVisible();

    await expect(page.getByPlaceholder("Buscar (Pressione '/' para focar)")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Filmes Populares" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Filmes Em Cartaz" })).toBeVisible();

    await expect(page.getByText("Baseado em TMDb API")).toBeVisible();
    await expect(page.getByText("Criado por Rander Carlos")).toBeVisible();
  });
});
