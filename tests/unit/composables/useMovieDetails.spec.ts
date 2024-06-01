import { movieDetailsResponseMock } from "#/mockData";
import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { useMovieDetails } from "@/composables/useMovieDetails";
import { toRef } from "vue";


describe("useMovieDetails.ts", () => {
  it("returns movie details correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get(uri => uri.includes("movie/"))
      .reply(200, movieDetailsResponseMock);

    const movieId = toRef(1);
    const { data } = await useMovieDetails(movieId);

    expect(data.value).toEqual(movieDetailsResponseMock);
  });

  it("returns a error if fails on get movie details", async() => {
    nock(CONFIG.API_BASE_URL)
      .get(uri => uri.includes("movie/"))
      .replyWithError("something goes wrong");

    const movieId = toRef(1);
    const { error } = await useMovieDetails(movieId);

    expect(error.value).not.toBe(null);
    expect(error.value).toBe("something goes wrong");
  });

  it("returns if get movie details request is finished", async() => {
    nock(CONFIG.API_BASE_URL)
      .get(uri => uri.includes("movie/"))
      .delay(500)
      .reply(200, movieDetailsResponseMock);

    const movieId = toRef(1);
    const { isFinished } = await useMovieDetails(movieId);

    expect(isFinished.value).toBe(true);
  });

});
