import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import TvShowListItemDetails from "@/components/tv-show/TvShowListItemDetails.vue";
import { tvShowDetailsMock } from "#/mockData";

describe("TvShowListItemDetails.vue", () => {
  it("renders correctly", async() => {
    const wrapper = mount(TvShowListItemDetails, {
      props: {
        tvShowDetails: tvShowDetailsMock
      },
      global: {
        stubs: {
          TvShowListItemDetailsInfo: true,
          TvShowListItemDetailsCast: true,
          TvShowListItemDetailsImages: true
        }
      }
    });

    const wrapperTvShowListItemDetailsInfo = wrapper
      .findComponent({ name: "TvShowListItemDetailsInfo" });
    const wrapperTvShowListItemDetailsCast = wrapper
      .findComponent({ name: "TvShowListItemDetailsCast" });
    const wrapperTvShowListItemDetailsImages = wrapper
      .findComponent({ name: "TvShowListItemDetailsImages" });

    expect(wrapperTvShowListItemDetailsInfo.exists()).toBe(true);
    expect(wrapperTvShowListItemDetailsCast.exists()).toBe(true);
    expect(wrapperTvShowListItemDetailsImages.exists()).toBe(true);
  });
});
