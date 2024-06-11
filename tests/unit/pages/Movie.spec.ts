import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Movie from "@/pages/Movie.vue";
import { defineComponent } from "vue";
import { resolvedPromises } from "@/utils/helper";
import CONFIG from "@/config";
import nock from "nock";
import { movieDetailsResponseMock } from "#/mockData";
import * as handleErrorFile from "@/utils/handleError";
import * as useMovieDetailsFile from "@/composables/movie/useMovieDetails";

vi.mock("vue-router", () => ({
  useRoute: vi.fn().mockReturnValue({
    params: {
      movieId: 1
    }
  }),
}));

nock(CONFIG.API_BASE_URL)
  .get("/movie/1?append_to_response=credits,videos,images")
  .reply(200, movieDetailsResponseMock);

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

    const movieListItemDetailsWrapper = suspenseWrapper
      .findComponent({ name: "MovieListItemDetails"});

    expect(movieListItemDetailsWrapper.exists()).toBe(true);
  });

  it("show notification error on fails", async() => {
    vi.spyOn(useMovieDetailsFile, "useMovieDetails")
      .mockImplementation(() => {
        throw new Error("Movie details fetch error");
      });

    vi.spyOn(handleErrorFile, "handleError");

    mount(AsyncComponent, {
      global: {
        stubs: {
          MovieListItemDetails: true
        }
      }
    });

    expect(handleErrorFile.handleError).toHaveBeenCalledWith(
      "Error on show movie.",
      new Error("Movie details fetch error")
    );
  });
});
