import PageSkeleton from "@/components/skeleton/PageSkeleton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


describe("PageSkeleton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(PageSkeleton, {
      global: {
        stubs: {
          CardSkeleton: true
        }
      }
    });

    const aboveCards = wrapper.get(".above-cards");
    const belowCards = wrapper.get(".below-cards");

    expect(aboveCards.findAllComponents({ "name": "CardSkeleton" })).toHaveLength(15);
    expect(belowCards.findAllComponents({ "name": "CardSkeleton" })).toHaveLength(15);
  });
});
