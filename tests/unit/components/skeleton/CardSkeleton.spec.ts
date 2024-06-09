import CardSkeleton from "@/components/skeleton/CardSkeleton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


describe("CardSkeleton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(CardSkeleton, {
      global: {
        stubs: {
          SkeletonLoader: true
        }
      }
    });

    expect(wrapper.findAllComponents({ "name": "SkeletonLoader" })).toHaveLength(3);
  });
});
