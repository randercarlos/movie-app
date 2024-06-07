import MoviesCardSkeleton from "@/components/skeleton/MoviesCardSkeleton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


describe("MoviesCardSkeleton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(MoviesCardSkeleton, {
      global: {
        stubs: {
          SkeletonLoader: true
        }
      }
    });

    expect(wrapper.findAllComponents({ "name": "SkeletonLoader" })).toHaveLength(3);
  });
});
