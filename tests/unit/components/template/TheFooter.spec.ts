import { describe, expect, it } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import TheFooter from "@/components/template/TheFooter.vue";
import enUS from "@/i18n/locales/en-US.json";
import ptBR from "@/i18n/locales/pt-BR.json";
import { I18nGlobalLocales } from "@/typings/enums";
import { changeI18nGlobalLocale } from "#/unit/globalSetup.unit";

describe("TheFooter.vue", () => {
  it("renders correctly", async() => {
    const wrapper = shallowMount(TheFooter);

    expect(wrapper.exists()).toBe(true);
  });

  it("renders link to TMDb API documentation", async() => {
    const wrapper = mount(TheFooter);

    const link = wrapper.find("a");

    expect(link.exists()).toBe(true);
    expect(link.attributes("href")).toBe("https://www.themoviedb.org/documentation/api");
  });

  it("show texts in en-US locale(default)", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.enUS);

    const wrapper = mount(TheFooter);

    expect(wrapper.text()).toContain(enUS.footer.poweredBy);
  });

  it("show texts in pt-BR locale", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.ptBR);

    const wrapper = mount(TheFooter);

    expect(wrapper.text()).toContain(ptBR.footer.poweredBy);
  });
});
