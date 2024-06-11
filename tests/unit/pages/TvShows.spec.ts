import { describe, expect, it, vi, type Mock } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import TvShows from "@/pages/TvShows.vue";
import nock from "nock";
import CONFIG from "@/config";
import { resolvedPromises } from "@/utils/helper";
import { tvShowGenresResponseMock, topRatedTvShowsResponseMock, popularTvShowsResponseMock }
  from "#/mockData";
import { useTvShowGenres } from "@/composables/tv-show/useTvShowGenres";
import { handleError } from "@/utils/handleError";


nock(CONFIG.API_BASE_URL)
  .persist()
  .get("/genre/tv/list")
  .reply(200, tvShowGenresResponseMock)
  .get("/tv/popular")
  .reply(200, popularTvShowsResponseMock)
  .get("/tv/top_rated")
  .reply(200, topRatedTvShowsResponseMock);

const AsyncComponent = defineComponent({
  components: { TvShows },
  template: "<Suspense><TvShows /></Suspense>"
});

describe("TvShows.vue", () => {
  it("renders correctly", async() => {
    const suspenseWrapper = mount(AsyncComponent, {
      global: {
        stubs: {
          TvShowList: true
        }
      }
    });

    await resolvedPromises();

    const tvShowsWrapper = suspenseWrapper.findComponent({ name: "TvShows"});

    expect(tvShowsWrapper.exists()).toBe(true);
    expect(tvShowsWrapper.html()).toContain("Popular Shows");
    expect(tvShowsWrapper.html()).toContain("Top Rated");

    const tvShowListWrapper = tvShowsWrapper.findAllComponents({ name: "TvShowList"});

    expect(tvShowListWrapper).toHaveLength(2);
  });

  it("renders tv shows list", async() => {

    const suspenseWrapper = mount(AsyncComponent, {
      global: {
        stubs: {
          TvShowList: true
        }
      }
    });

    await resolvedPromises();

    const tvShowListWrapper = suspenseWrapper.findAllComponents({ name: "TvShowList"});

    expect(tvShowListWrapper).toHaveLength(2);
  });

  it("show notification error on fails", async() => {

    vi.mock("@/composables/tv-show/useTvShowGenres");
    vi.mock("@/utils/handleError");

    (useTvShowGenres as Mock).mockImplementation(() => { throw new Error("Genres fetch error"); });

    mount(AsyncComponent, {
      global: {
        stubs: {
          TvShowList: true
        }
      }
    });

    await resolvedPromises();

    expect(handleError).toHaveBeenCalledWith(
      "Error on show tv shows.",
      new Error("Genres fetch error")
    );

  });
});
