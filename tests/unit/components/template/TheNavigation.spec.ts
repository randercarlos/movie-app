import { describe, expect, it } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import TheNavigation from "@/components/template/TheNavigation.vue";
import enUS from "@/i18n/locales/en-US.json";
import ptBR from "@/i18n/locales/pt-BR.json";
import { I18nGlobalLocales  } from "@/typings/enums";
import { changeI18nGlobalLocale } from "#/unit/setupTests";

describe("TheNavigation.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(TheNavigation, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          HeaderDropdown: true,
          HeaderI18nButton: true,
          HeaderThemeButtom: true
        }
      }
    });

    const headerDropdown = wrapper.findComponent({ name: "HeaderDropdown" });
    const headerI18nButton = wrapper.findComponent({ name: "HeaderI18nButton" });
    const headerThemeButtom = wrapper.findComponent({ name: "HeaderThemeButtom" });

    expect(headerDropdown.exists()).toBe(true);
    expect(headerI18nButton.exists()).toBe(true);
    expect(headerThemeButtom.exists()).toBe(true);
  });

  it("renders logo correctly", () => {
    const wrapper = mount(TheNavigation, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          HeaderDropdown: true,
          HeaderI18nButton: true,
          HeaderThemeButtom: true
        }
      }
    });
    const menuLinks = wrapper.findAllComponents(RouterLinkStub);

    expect(menuLinks[0].props().to).toBe("/");
    expect(menuLinks[0].html()).toContain("svg");
  });

  it("renders avatar correctly", () => {
    const wrapper = mount(TheNavigation, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          HeaderDropdown: true,
          HeaderI18nButton: true,
          HeaderThemeButtom: true,
        }
      }
    });
    const avatarImg = wrapper.find("[data-test='avatar-img']");

    expect(avatarImg.exists()).toBe(true);
  });

  it("renders dropdown search correctly", () => {
    const wrapper = mount(TheNavigation, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          HeaderDropdown: true,
          HeaderI18nButton: true,
          HeaderThemeButtom: true
        }
      }
    });
    const headerDropdown = wrapper.findComponent({ name: "HeaderDropdown" });

    expect(headerDropdown.exists()).toBe(true);
  });


  it("renders menu items correctly", () => {
    const wrapper = mount(TheNavigation, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          HeaderDropdown: true,
          HeaderI18nButton: true,
          HeaderThemeButtom: true
        }
      }
    });
    const menuLinks = wrapper.findAllComponents(RouterLinkStub);

    expect(menuLinks[0].props().to).toBe("/");
    expect(menuLinks[0].html()).toContain("svg");
    expect(menuLinks[1].props().to).toEqual({ name: "movies" });
    expect(menuLinks[2].props().to).toEqual({ name: "tvShows" });
    expect(menuLinks[3].props().to).toEqual({ name: "actors" });
  });

  it("show texts in en-US locale(default)", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.enUS);

    const wrapper = mount(TheNavigation, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          HeaderDropdown: true,
          HeaderI18nButton: true,
          HeaderThemeButtom: true
        }
      }
    });
    const menuLinks = wrapper.findAllComponents(RouterLinkStub);

    expect(menuLinks[1].text()).toContain(enUS.header.menu.movies);
    expect(menuLinks[2].text()).toContain(enUS.header.menu.tvShows);
    expect(menuLinks[3].text()).toContain(enUS.header.menu.actors);
  });

  it("show texts in pt-BR locale", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.ptBR);

    const wrapper = mount(TheNavigation, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          HeaderDropdown: true,
          HeaderI18nButton: true,
          HeaderThemeButtom: true
        }
      }
    });
    const menuLinks = wrapper.findAllComponents(RouterLinkStub);

    expect(menuLinks[1].text()).toContain(ptBR.header.menu.movies);
    expect(menuLinks[2].text()).toContain(ptBR.header.menu.tvShows);
    expect(menuLinks[3].text()).toContain(ptBR.header.menu.actors);
  });
});
