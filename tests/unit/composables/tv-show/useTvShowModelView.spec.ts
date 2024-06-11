import { describe, expect, it } from "vitest";
import { useTvShowsModelView } from "@/composables/tv-show/useTvShowsModelView";
import { tvShowGenresResponseMock, tvShowsMock, popularTvShowsResponseMock } from "#/mockData";

describe("useTvShowsModelView.ts", () => {
  it("returns popular tv shows ready to view correctly", async() => {
    const { data } = await useTvShowsModelView(popularTvShowsResponseMock,
      tvShowGenresResponseMock);

    expect(data.value).toEqual(tvShowsMock);
  });
});
