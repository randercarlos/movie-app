import { describe, expect, it } from "vitest";
import { useActorDetailsModelView } from "@/composables/actor/useActorDetailsModelView";
import {
  actorDetailsMock,
  actorDetailsResponseMock,
  actorDetailsWithDefaultImagesMock,
  actorDetailsWithDefaultImagesResponseMock
} from "#/mockData";
import type {
  ActorDetailsResponse
} from "@/typings/interfaces";

describe("useActorDetailsModelView.ts", () => {
  it("returns actors details data correctly", async() => {
    const { data: actorDetails } =
      await useActorDetailsModelView(actorDetailsResponseMock);

    expect(actorDetails.value).toEqual(actorDetailsMock);
  });

  it("returns actors details data with default images correctly", async() => {
    const { data } = await useActorDetailsModelView(
      actorDetailsWithDefaultImagesResponseMock as ActorDetailsResponse
    );

    expect(data.value).toEqual(actorDetailsWithDefaultImagesMock);
  });
});
