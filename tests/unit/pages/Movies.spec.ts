import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import { defineComponent } from "vue";
import Movies from "@/pages/Movies.vue";
import nock from "nock";
import CONFIG from "@/config";
import { resolvedPromises } from "@/utils/helper";
import { movieGenresResponseMock, nowPlayingMoviesResponseMock, popularMoviesResponseMock }
  from "#/mockData";

// vi.mock("@/composables/useMovieGenres", () => ({
//   useMovieGenres: vi.fn(() => ({
//     data: toRef({
//       genres: [
//         { id: 28, name: "Action" },
//         { id: 12, name: "Adventure" }
//       ]
//     })
//   }))
// }));


nock(CONFIG.API_BASE_URL)
  .persist()
  .get("/genre/movie/list")
  .reply(200, movieGenresResponseMock)
  .get("/movie/popular")
  .reply(200, popularMoviesResponseMock)
  .get("/movie/now_playing")
  .reply(200, nowPlayingMoviesResponseMock);

const AsyncComponent = defineComponent({
  components: { Movies },
  template: "<Suspense><Movies /></Suspense>"
});

describe("Movies.vue", () => {
  it("renders correctly", async() => {
    const suspenseWrapper = mount(AsyncComponent, {
      global: {
        stubs: {
          MovieList: true
        }
      }
    });

    await resolvedPromises();

    const moviesWrapper = suspenseWrapper.findComponent({ name: "Movies"});

    expect(moviesWrapper.exists()).toBe(true);
    expect(moviesWrapper.html()).toContain("Popular Movies");
    expect(moviesWrapper.html()).toContain("Now Playing");

    const movieListWrapper = moviesWrapper.findAllComponents({ name: "MovieList"});

    expect(movieListWrapper).toHaveLength(2);
  });

  it("renders movies list", async() => {

    const suspenseWrapper = mount(AsyncComponent, {
      global: {
        stubs: {
          MovieList: true
        }
      }
    });

    await resolvedPromises();

    const movieListWrapper = suspenseWrapper.findAllComponents({ name: "MovieList"});

    expect(movieListWrapper).toHaveLength(2);
  });
});
