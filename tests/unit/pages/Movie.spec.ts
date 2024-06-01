import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Movie from "@/pages/Movie.vue";
import { defineComponent } from "vue";
import { resolvedPromises } from "@/utils/helper";
import nock from "nock";
import CONFIG from "@/config";
import { movieDetailsResponseMock } from "#/mockData";


nock(CONFIG.API_BASE_URL)
  .persist() // keep interceptor calls after intercept any one
  .get(uri => uri.includes("movie/"))
  .reply(200, movieDetailsResponseMock);

vi.mock("vue-router", () => ({
  useRoute: vi.fn().mockReturnValue({
    params: {
      movieId: 1
    }
  }),
}));

const AsyncComponent = defineComponent({
  components: { Movie },
  template: "<Suspense><Movie /></Suspense>"
});

describe("Movie.vue", () => {
  it("renders correctly", async() => {
    const suspenseWrapper = mount(AsyncComponent,{
      global: {
        stubs: {
          MovieListItemDetails: true
        }
      }
    });

    await resolvedPromises();

    const movieWrapper = suspenseWrapper.findComponent({ name: "Movie"});
    expect(movieWrapper.exists()).toBe(true);

    const MovieListItemDetailsWrapper = movieWrapper
      .findComponent({ name: "MovieListItemDetails"});

    expect(MovieListItemDetailsWrapper.exists()).toBe(true);
  });
});
