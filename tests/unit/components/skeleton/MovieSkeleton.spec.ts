import MovieSkeleton from "@/components/skeleton/MovieSkeleton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


describe("MovieSkeleton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(MovieSkeleton, {
      global: {
        stubs: {
          SkeletonLoader: true
        }
      }
    });

    const movieInfo = wrapper.get(".movie-info");

    expect(movieInfo.findAllComponents({ "name": "SkeletonLoader" })).toHaveLength(11);
  });
});
