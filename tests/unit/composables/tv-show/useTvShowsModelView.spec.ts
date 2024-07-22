import { describe, expect, it } from "vitest";
import { useTvShowsModelView } from "@/composables/tv-show/useTvShowsModelView";
import { 
  tvShowGenresResponseMock, 
  popularTvShowsResponseMock, 
  popularTvShowsMock 
} from "#/mockData";

describe("useTvShowsModelView.ts", () => {
  it("returns popular tv shows data correctly", async() => {
    const { data } = await useTvShowsModelView(
      popularTvShowsResponseMock,
      tvShowGenresResponseMock
    );

    expect(data.value).toEqual(popularTvShowsMock);
  });
});
