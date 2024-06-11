import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { useTopRatedTvShows } from "@/composables/tv-show/useTopRatedTvShows";
import { topRatedTvShowsResponseMock } from "#/mockData";


describe("useTopRatedTvShows.ts", () => {
  it("returns top rated tv shows correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/tv/top_rated")
      .reply(200, topRatedTvShowsResponseMock);

    const { data } = await useTopRatedTvShows();

    expect(data.value).toEqual(topRatedTvShowsResponseMock);
  });

  it("returns a error if fails on get top rated tv shows", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/tv/top_rated")
      .replyWithError("something goes wrong");

    const { error } = await useTopRatedTvShows();

    expect(error.value).toBeInstanceOf(Error);
    expect(error.value?.message).toBe("something goes wrong");
  });

  it("returns if get top rated tv shows request is finished", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/tv/top_rated")
      .delay(500)
      .reply(200, topRatedTvShowsResponseMock);

    const { isFinished } = await useTopRatedTvShows();

    expect(isFinished.value).toBe(true);
  });

});
