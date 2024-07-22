import { describe, expect, it } from "vitest";
import { useTvShowDetailsModelView } from "@/composables/tv-show/useTvShowDetailsModelView";
import {
  tvShowDetailsMock,
  tvShowDetailsResponseMock,
  tvShowDetailsWithDefaultImagesMock,
  tvShowDetailsWithDefaultImagesResponseMock
} from "#/mockData";
import type { TvShowDetailsResponse } from "@/typings/interfaces";

describe("useTvShowDetailsModelView.ts", () => {
  it("returns tv shows details data correctly", async() => {
    const { data } = await useTvShowDetailsModelView(tvShowDetailsResponseMock);

    expect(data.value).toEqual(tvShowDetailsMock);
  });

  it("returns tv shows data with default images correctly", async() => {
    const { data } = await useTvShowDetailsModelView(
      tvShowDetailsWithDefaultImagesResponseMock as TvShowDetailsResponse
    );

    expect(data.value).toEqual(tvShowDetailsWithDefaultImagesMock);
  });
});
