import { describe, expect, it } from "vitest";
import { RouterLinkStub, flushPromises, mount, } from "@vue/test-utils";
import TvShowListItem from "@/components/tv-show/TvShowListItem.vue";
import type { TvShow } from "@/typings/interfaces";
import { topRatedTvShowsMock } from "#/mockData";

describe("TvShowListItem.vue", () => {
  it("renders correctly", async() => {
    const tvShow: TvShow = topRatedTvShowsMock.at(0) as TvShow;

    const wrapper = mount(TvShowListItem, {
      props: {
        tvShow
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    await flushPromises();

    const links = wrapper.findAllComponents(RouterLinkStub);
    const img = wrapper.get("img");

    expect(links).toHaveLength(2);
    expect(links.at(0)?.props().to).toEqual({ name: "tvShow",
      params: { tvShowId: tvShow.id } });
    expect(links.at(1)?.props().to).toEqual({ name: "tvShow",
      params: { tvShowId: tvShow.id } });

    expect(img.attributes("src"))
      .toBe(tvShow.poster_path);

    expect(wrapper.text()).toContain(tvShow.name);
    expect(wrapper.text()).toContain(tvShow.vote_average);
    expect(wrapper.text()).toContain(tvShow.first_air_date);
    expect(wrapper.text()).toContain(tvShow.genres);
  });
});
