import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import TvShow from "@/pages/TvShow.vue";
import { defineComponent } from "vue";
import { resolvedPromises } from "@/utils/helper";
import CONFIG from "@/config";
import nock from "nock";
import { tvShowDetailsResponseMock } from "#/mockData";
import * as handleErrorFile from "@/utils/handleError";
import * as useTvShowDetailsFile from "@/composables/tv-show/useTvShowDetails";

vi.mock("vue-router", () => ({
  useRoute: vi.fn().mockReturnValue({
    params: {
      tvShowId: 1
    }
  }),
}));

nock(CONFIG.API_BASE_URL)
  .get("/tv/1?append_to_response=credits,videos,images")
  .reply(200, tvShowDetailsResponseMock);

const AsyncComponent = defineComponent({
  components: { TvShow },
  template: "<Suspense><TvShow /></Suspense>"
});

describe("TvShow.vue", () => {
  it("renders correctly", async() => {
    const suspenseWrapper = mount(AsyncComponent,{
      global: {
        stubs: {
          TvShowListItemDetails: true
        }
      }
    });

    await resolvedPromises();

    const tvShowListItemDetailsWrapper = suspenseWrapper
      .findComponent({ name: "TvShowListItemDetails"});

    expect(tvShowListItemDetailsWrapper.exists()).toBe(true);
  });

  it("show notification error on fails", async() => {
    vi.spyOn(useTvShowDetailsFile, "useTvShowDetails")
      .mockImplementation(() => {
        throw new Error("Tv shows details fetch error");
      });

    vi.spyOn(handleErrorFile, "handleError");

    mount(AsyncComponent, {
      global: {
        stubs: {
          TvShowListItemDetails: true
        }
      }
    });

    expect(handleErrorFile.handleError).toHaveBeenCalledWith(
      "Error on show tv.",
      new Error("Tv shows details fetch error")
    );
  });
});
