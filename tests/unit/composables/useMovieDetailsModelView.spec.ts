import { describe, expect, it } from "vitest";
import { useMovieDetailsModelView } from "@/composables/useMovieDetailsModelView";
import { movieDetailsMock, movieDetailsResponseMock } from "#/mockData";

describe("useMovieDetailsModelView.ts", () => {
  it("returns movies details model view correctly", async() => {
    const { data } = await useMovieDetailsModelView(movieDetailsResponseMock);

    expect(data.value).toEqual(movieDetailsMock);
  });
});
