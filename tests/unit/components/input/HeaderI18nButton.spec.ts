
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { I18nGlobalLocales  } from "@/typings/enums";
import HeaderI18nButton from "@/components/inputs/HeaderI18nButton.vue";
import i18n from "@/i18n";
import type { Ref } from "vue";

describe("HeaderI18nButton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(HeaderI18nButton);
    const i18nButton = wrapper.find("button");
    const i18nImage = wrapper.find("img");

    expect(i18nButton.exists()).toBe(true);
    expect(i18nImage.exists()).toBe(true);
  });

  it("renders toggle button to change global locale to pt-BR by default", () => {
    const wrapper = mount(HeaderI18nButton);
    const i18nImage = wrapper.find("img");

    expect((i18n.global.locale as unknown as Ref<string>).value).toBe(I18nGlobalLocales.enUS);
    expect(i18nImage.attributes("src")).toContain("brazil-flag.svg");
    expect(i18nImage.attributes("title")).toContain("Mudar idioma para Português");
  });

  it("changes locale to pt-BR when clicks on toggle button",
    async() => {
      const wrapper = mount(HeaderI18nButton);
      const i18nButton = wrapper.find("button");
      const i18nImage = wrapper.find("img");

      await i18nButton.trigger("click");

      expect((i18n.global.locale as unknown as Ref<string>).value).toBe(I18nGlobalLocales.ptBR);
      expect(i18nImage.attributes("src")).toContain("usa-flag.svg");
      expect(i18nImage.attributes("title")).toContain("Change idiom to English");
    });

  it("changes locale to en-US when clicks on toggle button again",
    async() => {
      const wrapper = mount(HeaderI18nButton);
      const i18nButton = wrapper.find("button");
      const i18nImage = wrapper.find("img");

      await i18nButton.trigger("click");

      expect((i18n.global.locale as unknown as Ref<string>).value).toBe(I18nGlobalLocales.enUS);
      expect(i18nImage.attributes("src")).toContain("brazil-flag.svg");
      expect(i18nImage.attributes("title")).toContain("Mudar idioma para Português");
    });
});
