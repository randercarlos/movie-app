import SkeletonLoader from "@/components/skeleton/SkeletonLoader.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


describe("SkeletonLoader.vue", () => {
  it("renders correctly", async() => {
    const wrapper = mount(SkeletonLoader);

    const skeletonLoader = wrapper.find("[data-test='SkeletonLoader']");

    expect(skeletonLoader.exists()).toBe(true);
  });

  it("renders default props correctly", async() => {
    const wrapper = mount(SkeletonLoader);

    const skeletonLoader = wrapper.find("[data-test='SkeletonLoader']");

    expect(skeletonLoader.classes("rounded-lg")).toBe(true);
  });

  it("renders rectangle shape props correctly", async() => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        shape: "rectangle"
      }
    });

    const skeletonLoader = wrapper.find("[data-test='SkeletonLoader']");

    expect(skeletonLoader.classes("rounded-lg")).toBe(true);
    expect(skeletonLoader.classes("rounded-full")).toBe(false);
  });

  it("renders circle shape props correctly", async() => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        shape: "circle"
      }
    });

    const skeletonLoader = wrapper.find("[data-test='SkeletonLoader']");

    expect(skeletonLoader.classes("rounded-full")).toBe(true);
    expect(skeletonLoader.classes("rounded-lg")).toBe(false);
  });

  it("renders classes props correctly", async() => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        class: "w-50 h-4"
      }
    });

    const skeletonLoader = wrapper.find("[data-test='SkeletonLoader']");

    expect(skeletonLoader.classes("w-50")).toBe(true);
    expect(skeletonLoader.classes("h-4")).toBe(true);
  });

});
