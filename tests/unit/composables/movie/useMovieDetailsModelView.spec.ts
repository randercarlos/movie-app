import { describe, expect, it } from "vitest";
import { useMovieDetailsModelView } from "@/composables/movie/useMovieDetailsModelView";
import {
  movieDetailsMock,
  movieDetailsResponseMock,
  movieDetailsWithDefaultImagesMock,
  movieDetailsWithDefaultImagesResponseMock
} from "#/mockData";
import type {
  MovieDetailsResponse
} from "@/typings/interfaces";

describe("useMovieDetailsModelView.ts", () => {
  it("returns movies details with images correctly", async() => {

    const { data: movieDetails } =
      await useMovieDetailsModelView(movieDetailsResponseMock);

    expect(movieDetails.value).toEqual(movieDetailsMock);
  });

  it("returns movies details with default images model correctly", async() => {

    const { data } = await useMovieDetailsModelView(
      movieDetailsWithDefaultImagesResponseMock as MovieDetailsResponse
    );

    expect(data.value).toEqual(movieDetailsWithDefaultImagesMock);
  });
});
