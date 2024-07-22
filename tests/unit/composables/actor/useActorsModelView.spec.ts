import { describe, expect, it } from "vitest";
import { popularActorsMock, popularActorsResponseMock } from "#/mockData";
import { useActorsModelView } from "@/composables/actor/useActorsModelView";

describe("useActorsModelView.ts", () => {
  it("returns popular actors data correctly", async() => {
    const { data } = await useActorsModelView(popularActorsResponseMock);

    expect(data.value).toEqual(popularActorsMock);
  });
});
