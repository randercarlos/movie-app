import { tvShowDetailsResponseMock } from "#/mockData";
import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { useTvShowDetails } from "@/composables/tv-show/useTvShowDetails";
import { toRef } from "vue";


describe("useTvShowDetails.ts", () => {
  it("returns tv show details correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get(uri => uri.includes("tv/"))
      .reply(200, tvShowDetailsResponseMock);

    const tvShowId = toRef(1);
    const { data } = await useTvShowDetails(tvShowId);

    expect(data.value).toEqual(tvShowDetailsResponseMock);
  });

  it("returns a error if fails on get tv show details", async() => {
    nock(CONFIG.API_BASE_URL)
      .get(uri => uri.includes("tv/"))
      .replyWithError("something goes wrong");

    const tvShowId = toRef(1);
    const { error } = await useTvShowDetails(tvShowId);

    expect(error.value).toBeInstanceOf(Error);
    expect(error.value?.message).toBe("something goes wrong");
  });

  it("returns if get tv show details request is finished", async() => {
    nock(CONFIG.API_BASE_URL)
      .get(uri => uri.includes("tv/"))
      .delay(500)
      .reply(200, tvShowDetailsResponseMock);

    const tvShowId = toRef(1);
    const { isFinished } = await useTvShowDetails(tvShowId);

    expect(isFinished.value).toBe(true);
  });

});
