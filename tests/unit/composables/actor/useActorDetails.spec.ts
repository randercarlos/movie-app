import { actorDetailsResponseMock } from "#/mockData";
import { describe, expect, it } from "vitest";
import nock from "nock";
import CONFIG from "@/config";
import { useActorDetails } from "@/composables/actor/useActorDetails";
import { toRef } from "vue";


describe("useActorDetails.ts", () => {
  it("returns actor details correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get(uri => uri.includes("person/"))
      .reply(200, actorDetailsResponseMock);

    const actorId = toRef(1);
    const { data } = await useActorDetails(actorId);

    expect(data.value).toEqual(actorDetailsResponseMock);
  });

  it("returns a error if fails on get actor details", async() => {
    nock(CONFIG.API_BASE_URL)
      .get(uri => uri.includes("person/"))
      .replyWithError("something goes wrong");

    const actorId = toRef(1);
    const { error } = await useActorDetails(actorId);

    expect(error.value).toBeInstanceOf(Error);
    expect(error.value?.message).toBe("something goes wrong");
  });

  it("returns if get actor details request is finished", async() => {
    nock(CONFIG.API_BASE_URL)
      .get(uri => uri.includes("person/"))
      .delay(500)
      .reply(200, actorDetailsResponseMock);

    const actorId = toRef(1);
    const { isFinished } = await useActorDetails(actorId);

    expect(isFinished.value).toBe(true);
  });

});
