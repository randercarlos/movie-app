import MoviesSkeleton from "@/components/skeleton/MoviesSkeleton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


describe("MoviesSkeleton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(MoviesSkeleton, {
      global: {
        stubs: {
          MoviesCardSkeleton: true
        }
      }
    });

    const popularMovies = wrapper.get(".popular-movies");
    const nowPlayingMovies = wrapper.get(".now-playing-movies");

    expect(popularMovies.text()).toContain("Popular Movies");
    expect(nowPlayingMovies.text()).toContain("Now Playing");

    expect(popularMovies.findAllComponents({ "name": "MoviesCardSkeleton" })).toHaveLength(15);
    expect(nowPlayingMovies.findAllComponents({ "name": "MoviesCardSkeleton" })).toHaveLength(15);
  });
});
