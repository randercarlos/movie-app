import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { usePopularTvShows } from "@/composables/tv-show/usePopularTvShows";
import { popularTvShowsResponseMock } from "#/mockData";

describe("usePopularTvShows.ts", () => {
  it("returns popular tv shows correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/tv/popular")
      .reply(200, popularTvShowsResponseMock);

    const { data } = await usePopularTvShows();

    expect(data.value).toEqual(popularTvShowsResponseMock);
  });

  it("returns a error if fails on get popular tv shows", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/tv/popular")
      .replyWithError("something goes wrong");

    const { error } = await usePopularTvShows();

    expect(error.value).toBeInstanceOf(Error);
    expect(error.value?.message).toBe("something goes wrong");
  });

  it("returns if get popular tv shows request is finished", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/tv/popular")
      .delay(500)
      .reply(200, popularTvShowsResponseMock);

    const { isFinished } = await usePopularTvShows();

    expect(isFinished.value).toBe(true);
  });

});
