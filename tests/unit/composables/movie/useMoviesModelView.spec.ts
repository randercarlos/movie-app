import { describe, expect, it } from "vitest";
import { useMoviesModelView } from "@/composables/movie/useMoviesModelView";
import { movieGenresResponseMock, popularMoviesMock, popularMoviesResponseMock } from "#/mockData";

describe("useMoviesModelView.ts", () => {
  it("returns popular movies data correctly", async() => {
    const { data } = await useMoviesModelView(
      popularMoviesResponseMock, 
      movieGenresResponseMock
    );

    expect(data.value).toEqual(popularMoviesMock);
  });
});
