import { describe, expect, it } from "vitest";
import { useMoviesModelView } from "@/composables/movie/useMoviesModelView";
import { movieGenresResponseMock, moviesMock, popularMoviesResponseMock } from "#/mockData";

describe("useMoviesModelView.ts", () => {
  it("returns popular movies ready to view correctly", async() => {
    const { data } = await useMoviesModelView(popularMoviesResponseMock, movieGenresResponseMock);

    expect(data.value).toEqual(moviesMock);
  });
});
