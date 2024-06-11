import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { useTvShowGenres } from "@/composables/tv-show/useTvShowGenres";
import { tvShowGenresResponseMock } from "#/mockData";


describe("useTvShowGenres.ts", () => {
  it("returns tv show genres correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/genre/tv/list")
      .reply(200, tvShowGenresResponseMock);

    const { data } = await useTvShowGenres();

    expect(data.value).toEqual(tvShowGenresResponseMock);
  });

  it("returns a error if fails on get tv show genres", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/genre/tv/list")
      .replyWithError("something awful happened");

    const { error } = await useTvShowGenres();

    expect(error.value).toBeInstanceOf(Error);
    expect(error.value?.message).toBe("something awful happened");
  });

  it("returns if get tv show genres request is finished", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/genre/tv/list")
      .delay(500)
      .reply(200, tvShowGenresResponseMock);

    const { isFinished } = await useTvShowGenres();

    expect(isFinished.value).toBe(true);
  });

});
