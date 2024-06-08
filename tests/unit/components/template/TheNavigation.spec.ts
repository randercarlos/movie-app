
/* eslint-disable vue/one-component-per-file */
import { describe, expect, it } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import TheNavigation from "@/components/template/TheNavigation.vue";

describe("TheNavigation.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(TheNavigation, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          HeaderDropdown: true
        }
      }
    });
    const menuLinks = wrapper.findAllComponents(RouterLinkStub);
    const avatarImg = wrapper.find("[data-test='avatar-img']");

    expect(menuLinks[0].props().to).toBe("/");
    expect(menuLinks[0].html()).toContain("svg");

    expect(menuLinks[1].props().to).toEqual({
      name: "movies"
    });
    expect(menuLinks[1].text()).toContain("Movies");


    expect(menuLinks[2].props().to).toEqual({
      name: "tvShows"
    });
    expect(menuLinks[2].text()).toContain("TV Shows");

    // expect(menuLinks[3].props().to).toEqual({
    //   name: "tvShows"
    // });
    // expect(menuLinks[3].text()).toContain("TV Shows");

    expect(avatarImg.exists()).toBe(true);
    expect(wrapper.findComponent({ name: "HeaderDropdown" }).exists()).toBe(true);
  });
});
