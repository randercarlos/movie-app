import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import ActorListItemDetails from "@/components/actor/ActorListItemDetails.vue";
import { actorDetailsMock } from "#/mockData";

describe("ActorListItemDetails.vue", () => {
  it("renders correctly", async() => {
    const wrapper = mount(ActorListItemDetails, {
      props: {
        actorDetails: actorDetailsMock
      },
      global: {
        stubs: {
          ActorListItemDetailsInfo: true,
          ActorListItemDetailsImages: true,
          ActorListItemDetailsCredits: true
        }
      }
    });

    const wrapperActorListItemDetailsInfo = wrapper
      .findComponent({ name: "ActorListItemDetailsInfo" });
    const wrapperActorListItemDetailsImages = wrapper
      .findComponent({ name: "ActorListItemDetailsImages" });
    const wrapperActorListItemDetailsCredits = wrapper
      .findComponent({ name: "ActorListItemDetailsCredits" });

    expect(wrapperActorListItemDetailsInfo.exists()).toBe(true);
    expect(wrapperActorListItemDetailsImages.exists()).toBe(true);
    expect(wrapperActorListItemDetailsCredits.exists()).toBe(true);
  });
});
