
/* eslint-disable vue/one-component-per-file */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TheFooter from "@/components/template/TheFooter.vue";

describe("TheFooter.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(TheFooter);

    expect(wrapper.html()).toContain("Powered by");
  });

  it("has a link to TMDb API documentation", () => {
    const wrapper = mount(TheFooter);
    const link = wrapper.find("a");

    expect(link.exists()).toBe(true);
    expect(link.attributes("href")).toBe("https://www.themoviedb.org/documentation/api");
  });
});
