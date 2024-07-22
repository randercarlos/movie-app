
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { I18nGlobalLocales  } from "@/typings/enums";
import HeaderThemeButton from "@/components/inputs/HeaderThemeButton.vue";
import { changeI18nGlobalLocale } from "#/unit/setupTests";
import enUS from "@/i18n/locales/en-US.json";
import ptBR from "@/i18n/locales/pt-BR.json";

describe("HeaderThemeButton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(HeaderThemeButton);
    const themeButton = wrapper.find("button");

    expect(themeButton.exists()).toBe(true);
  });

  it("renders toggle button to change to light mode by default", () => {
    const html = document.querySelector("html");

    // Get the class list
    const htmlClassList = html?.classList;

    // Convert to an array (optional)
    const htmlClasses = htmlClassList ? Array.from(htmlClassList) : [];

    expect(htmlClasses).toContain("light");
  });

  it("clicks on light mode default toggle button and change to dark mode toggle button",
    async() => {
      const wrapper = mount(HeaderThemeButton);
      const themeButton = wrapper.find("button");

      await themeButton.trigger("click");

      const html = document.querySelector("html");
      const htmlClassList = html?.classList;
      const htmlClasses = htmlClassList ? Array.from(htmlClassList) : [];

      expect(htmlClasses).toContain("dark");
    });

  it("show texts in en-US locale(default)", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.enUS);

    const wrapper = mount(HeaderThemeButton);
    const i18nButton = wrapper.find("button");

    expect(i18nButton.attributes("title")).toContain(enUS.header.theme.lightMode);
  });

  it("show texts in pt-BR locale", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.ptBR);

    const wrapper = mount(HeaderThemeButton);
    const i18nButton = wrapper.find("button");

    expect(i18nButton.attributes("title")).toContain(ptBR.header.theme.lightMode);
  });
});
