import SkeletonLoader from "@/components/skeleton/SkeletonLoader.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


describe("SkeletonLoader.vue", () => {
  it("renders correctly", async() => {
    const wrapper = mount(SkeletonLoader);

    const skeletonDiv = wrapper.find("[data-test='skeletonDiv']");

    expect(skeletonDiv.exists()).toBe(true);
  });


  it("renders default type props correctly", async() => {
    const wrapper = mount(SkeletonLoader);

    const skeletonDiv = wrapper.get("[data-test='skeletonDiv']");

    expect(skeletonDiv.classes("rounded")).toBe(true);
    expect(skeletonDiv.classes("rounded-full")).toBe(false);
  });

  it("renders rectangle type props correctly", async() => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        type: "rectangle"
      }
    });

    const skeletonDiv = wrapper.get("[data-test='skeletonDiv']");

    expect(skeletonDiv.classes("rounded")).toBe(true);
    expect(skeletonDiv.classes("rounded-full")).toBe(false);
  });

  it("renders circle type props correctly", async() => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        type: "circle"
      }
    });

    const skeletonDiv = wrapper.get("[data-test='skeletonDiv']");

    expect(skeletonDiv.classes("rounded")).toBe(false);
    expect(skeletonDiv.classes("rounded-full")).toBe(true);
  });


  it("renders default background color props correctly", async() => {
    const wrapper = mount(SkeletonLoader);

    const skeletonDiv = wrapper.get("[data-test='skeletonDiv']");

    expect(skeletonDiv.classes("bg-gray-600")).toBe(true);
  });

  it("renders background color props correctly", async() => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        bgClass: "bg-blue-100"
      }
    });

    const skeletonDiv = wrapper.get("[data-test='skeletonDiv']");

    expect(skeletonDiv.classes("bg-blue-100")).toBe(true);
  });

  it("renders default css class props correctly", async() => {
    const wrapper = mount(SkeletonLoader);

    const skeletonDiv = wrapper.get("[data-test='skeletonDiv']");

    expect(skeletonDiv.classes()).toHaveLength(4);
  });

  it("renders css class props correctly", async() => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        cssClass: "text-gray-100"
      }
    });

    const skeletonDiv = wrapper.get("[data-test='skeletonDiv']");

    expect(skeletonDiv.classes("text-gray-100")).toBe(true);
  });

  it.todo("renders default shimmer color props correctly", async() => {
    const wrapper = mount(SkeletonLoader);

    const skeletonDiv = wrapper.find("[data-test='skeletonDiv'] div");

    // @ts-expect-error only way to test style is using raw javascript
    expect(skeletonDiv.element.style.backgroundImage).toBe(true);
  });

  it.todo("renders shimmer color props correctly", async() => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        shimmerColor: "#fa1242"
      }
    });

    const skeletonDiv = wrapper.find("[data-test='skeletonDiv'] div");

    // @ts-expect-error only way to test style is using raw javascript
    expect(skeletonDiv.element.style.backgroundImage).toContain("#fa1242");
  });
});
