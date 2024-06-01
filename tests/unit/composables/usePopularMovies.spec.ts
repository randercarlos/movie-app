import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { usePopularMovies } from "@/composables/usePopularMovies";
import { popularMoviesResponseMock } from "#/mockData";

describe("usePopularMovies.ts", () => {
  it("returns popular movies correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/movie/popular")
      .reply(200, popularMoviesResponseMock);

    const { data } = await usePopularMovies();

    expect(data.value).toEqual(popularMoviesResponseMock);
  });

  it("returns a error if fails on get popular movies", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/movie/popular")
      .replyWithError("something goes wrong");

    const { error } = await usePopularMovies();

    expect(error.value).not.toBe(null);
    expect(error.value).toBe("something goes wrong");
  });

  it("returns if get popular movies request is finished", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/movie/popular")
      .delay(500)
      .reply(200, popularMoviesResponseMock);

    const { isFinished } = await usePopularMovies();

    expect(isFinished.value).toBe(true);
  });

});
