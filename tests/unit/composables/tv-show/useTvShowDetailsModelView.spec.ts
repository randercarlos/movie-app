import { describe, expect, it } from "vitest";
import { useTvShowDetailsModelView } from "@/composables/tv-show/useTvShowDetailsModelView";
import { tvShowDetailsMock, tvShowDetailsResponseMock } from "#/mockData";

describe("useTvShowDetailsModelView.ts", () => {
  it("returns tvShows details model view correctly", async() => {
    const { data } = await useTvShowDetailsModelView(tvShowDetailsResponseMock);

    expect(data.value).toEqual(tvShowDetailsMock);
  });
});
