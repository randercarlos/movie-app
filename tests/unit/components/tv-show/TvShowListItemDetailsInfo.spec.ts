import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import TvShowListItemDetailsInfo from "@/components/tv-show/TvShowListItemDetailsInfo.vue";
import type { TvShowDetails } from "@/typings/interfaces";
import { nextTick } from "vue";
import { tvShowDetailsMock } from "#/mockData";

const tvShowDetails: TvShowDetails = tvShowDetailsMock as TvShowDetails;

const wrapper = mount(TvShowListItemDetailsInfo, {
  props: {
    tvShowDetails: tvShowDetails
  }
});

describe("TvShowListItemDetailsInfo.vue", () => {
  it("renders correctly", async() => {
    const imagePostPath = wrapper.get(".tv-info img");

    expect(imagePostPath.attributes("src")).toBe(tvShowDetails.poster_path);

    expect(wrapper.text()).toContain(tvShowDetails.name);
    expect(wrapper.text()).toContain(tvShowDetails.vote_average);
    expect(wrapper.text()).toContain(tvShowDetails.first_air_date);
    expect(wrapper.text()).toContain(tvShowDetails.genres);
    expect(wrapper.text()).toContain(tvShowDetails.overview);

    tvShowDetails?.crew?.forEach(crew => {
      expect(wrapper.text()).toContain(crew.name);
      expect(wrapper.text()).toContain(crew.job);
    });
  });

  it("show the play trailer button if there is a video to show", async() => {
    const tvShowTrailerButton = wrapper.find("#tvShowTrailerButton");

    expect(tvShowTrailerButton.exists()).toBe(true);
  });

  it("hide the play trailer button if there is no video to show.", async() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { videos, ...tvShowDetailsWithoutVideo } = tvShowDetails;
    const wrapper = mount(TvShowListItemDetailsInfo, {
      props: {
        tvShowDetails: tvShowDetailsWithoutVideo
      }
    });

    const tvShowTrailerButton = wrapper.find("#tvShowTrailerButton");

    expect(tvShowTrailerButton.exists()).toBe(false);
  });

  it("show the tvShow trailer modal when the play trailer button is clicked.", async() => {
    const tvShowTrailerButton = wrapper.find("#tvShowTrailerButton");

    expect(wrapper.find("#tvShowTrailerModal").exists()).toBe(false);

    await tvShowTrailerButton.trigger("click");

    expect(wrapper.find("#tvShowTrailerModal").exists()).toBe(true);

    expect(wrapper.find("iframe").attributes("src"))
      .toBe(`https://www.youtube.com/embed/${tvShowDetails?.videos?.results[0]?.key}`);
  });

  it("hide the tvShow trailer modal when the close trailer button is clicked.", async() => {
    const tvShowTrailerButton = wrapper.find("#tvShowTrailerButton");
    await tvShowTrailerButton.trigger("click");

    expect(wrapper.find("#tvShowTrailerModal").exists()).toBe(true);

    await wrapper.find("#tvShowTrailerModalCloseButton").trigger("click");

    expect(wrapper.find("#tvShowTrailerModal").exists()).toBe(false);
  });

  it("hide the tvShow trailer modal when the escape button is pressed.", async() => {
    const tvShowTrailerButton = wrapper.find("#tvShowTrailerButton");
    await tvShowTrailerButton.trigger("click");

    const tvShowTrailerModal = wrapper.find("#tvShowTrailerModal");
    await tvShowTrailerModal.trigger("keydown", { key: "Escape" });

    expect(wrapper.find("#tvShowTrailerModal").exists()).toBe(false);
  });

  it("hide the tvShow trailer modal when clicked outside it.", async() => {
    const tvShowTrailerButton = wrapper.find("#tvShowTrailerButton");
    await tvShowTrailerButton.trigger("click");

    // send mouse click event in document
    document.dispatchEvent(new MouseEvent("click"));

    // await DOM updates
    await nextTick();

    expect(wrapper.find("#tvShowTrailerModal").exists()).toBe(false);
  });

});
