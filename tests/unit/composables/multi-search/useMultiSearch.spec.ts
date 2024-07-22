import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { useMultiSearch } from "@/composables/multi-search/useMultiSearch";
import { multiSearchResponseMock } from "#/mockData";

describe("useMultiSearch.ts", () => {
  it("returns multi search for movies, tv shows and actors correctly", async() => {
    const search = "titanic";
    nock(CONFIG.API_BASE_URL)
      .get("/search/multi")
      .query({ query: search })
      .reply(200, multiSearchResponseMock);

    const { data } = await useMultiSearch(search);

    expect(data.value).toEqual(multiSearchResponseMock);
  });

  it("returns a error if fails on get multi search", async() => {
    const search = "titanic";
    nock(CONFIG.API_BASE_URL)
      .get("/search/multi")
      .query({ query: search })
      .replyWithError("something goes wrong");

    const { error } = await useMultiSearch(search);

    expect(error.value).toBeInstanceOf(Error);
    expect(error.value?.message).toBe("something goes wrong");
  });

  it("returns if get multi search request is finished", async() => {
    const search = "titanic";
    nock(CONFIG.API_BASE_URL)
      .get("/search/multi")
      .query({ query: search })
      .delay(500)
      .replyWithError("something goes wrong");

    const { isFinished } = await useMultiSearch(search);

    expect(isFinished.value).toBe(true);
  });

});
