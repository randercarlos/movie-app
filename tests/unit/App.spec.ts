
/* eslint-disable vue/one-component-per-file */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          TheHeader: true,
          TheFooter: true,
          RouterView: true
        }
      }
    });
    const header = wrapper.findComponent({ name: "TheHeader" });
    const footer = wrapper.findComponent({ name: "TheFooter" });
    const routerView = wrapper.findComponent({ name: "RouterView" });

    expect(header.exists()).toBe(true);
    expect(footer.exists()).toBe(true);
    expect(routerView.exists()).toBe(true);
  });
});
