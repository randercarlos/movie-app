
/* eslint-disable vue/one-component-per-file */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TheHeader from "@/components/template/TheHeader.vue";

describe("TheHeader.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(TheHeader, {
      global: {
        stubs: {
          TheNavigation: true
        }
      }
    });

    expect(wrapper.findComponent({name: "TheNavigation"}).exists()).toBe(true);
  });
});
