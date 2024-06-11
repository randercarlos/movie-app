import { tvShowDetailsMock } from "#/mockData";
import { describe, expect, it } from "vitest";
import { RouterLinkStub, mount, } from "@vue/test-utils";
import TvShowListItemDetailsCast from "@/components/tv-show/TvShowListItemDetailsCast.vue";
import type { TvShowDetails } from "@/typings/interfaces";

describe("TvShowListItemDetailsCast.vue", () => {
  const tvShowDetails: TvShowDetails = tvShowDetailsMock as TvShowDetails;

  it("renders correctly", async() => {
    const wrapper = mount(TvShowListItemDetailsCast, {
      props: {
        tvShowDetails: tvShowDetails
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    // Ensure the component renders the correct number of cast members
    const castCards = wrapper.findAll(".cast-card");
    const links = wrapper.findAllComponents(RouterLinkStub);

    expect(castCards.length).toBe(tvShowDetails?.cast?.length);

    castCards.forEach((castCard, index) => {
      const currenctTvShowDetailsCast = tvShowDetails?.cast?.at(index);

      expect(links?.at(index)?.props("to"))
        .toEqual({ name: "actor", params: { actorId: currenctTvShowDetailsCast?.id } });

      expect(links?.at(index)?.props("to"))
        .toEqual({ name: "actor", params: { actorId: currenctTvShowDetailsCast?.id } });
      expect(links?.at(index)?.html()).toContain(currenctTvShowDetailsCast?.profile_path);

      expect(links?.at(index + 1)?.props("to"))
        .toEqual({ name: "actor", params: { actorId: currenctTvShowDetailsCast?.id } });
      expect(links?.at(index + 1)?.text()).toContain(currenctTvShowDetailsCast?.name);

      expect(castCard.text()).toContain(currenctTvShowDetailsCast?.character);
    });
  });
});
