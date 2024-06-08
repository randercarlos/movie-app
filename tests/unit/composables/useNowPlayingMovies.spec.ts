import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { useNowPlayingMovies } from "@/composables/movie/useNowPlayingMovies";
import { nowPlayingMoviesResponseMock } from "#/mockData";


describe("useNowPlayingMovies.ts", () => {
  it("returns now playing movies correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/movie/now_playing")
      .reply(200, nowPlayingMoviesResponseMock);

    const { data } = await useNowPlayingMovies();

    expect(data.value).toEqual(nowPlayingMoviesResponseMock);
  });

  it("returns a error if fails on get now playing movies", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/movie/now_playing")
      .replyWithError("something goes wrong");

    const { error } = await useNowPlayingMovies();

    expect(error.value).toBeInstanceOf(Error);
    expect(error.value?.message).toBe("something goes wrong");
  });

  it("returns if get now playing movies request is finished", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/movie/now_playing")
      .delay(500)
      .reply(200, nowPlayingMoviesResponseMock);

    const { isFinished } = await useNowPlayingMovies();

    expect(isFinished.value).toBe(true);
  });

});
