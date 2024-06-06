import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { useMovieGenres } from "@/composables/useMovieGenres";
import { movieGenresResponseMock } from "#/mockData";


describe("useMovieGenres.ts", () => {
  it("returns movie genres correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/genre/movie/list")
      .reply(200, movieGenresResponseMock);

    const { data } = await useMovieGenres();

    expect(data.value).toEqual(movieGenresResponseMock);
  });

  it("returns a error if fails on get movie genres", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/genre/movie/list")
      .replyWithError("something awful happened");

    const { error } = await useMovieGenres();

    expect(error.value).toBeInstanceOf(Error);
    expect(error.value?.message).toBe("something awful happened");
  });

  it("returns if get movie genres request is finished", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/genre/movie/list")
      .delay(500)
      .reply(200, movieGenresResponseMock);

    const { isFinished } = await useMovieGenres();

    expect(isFinished.value).toBe(true);
  });

});
