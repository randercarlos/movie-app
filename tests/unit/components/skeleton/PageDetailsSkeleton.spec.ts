import PageDetailsSkeleton from "@/components/skeleton/PageDetailsSkeleton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


describe("PageDetailsSkeleton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(PageDetailsSkeleton, {
      global: {
        stubs: {
          SkeletonLoader: true
        }
      }
    });

    const cardInfo = wrapper.get(".card-info");
    const cardCast = wrapper.get(".card-cast");
    const cardImages = wrapper.get(".card-images");

    expect(cardInfo.findAllComponents({ "name": "SkeletonLoader" })).toHaveLength(12);
    expect(cardCast.findAllComponents({ "name": "SkeletonLoader" })).toHaveLength(16);
    expect(cardImages.findAllComponents({ "name": "SkeletonLoader" })).toHaveLength(10);
  });
});
