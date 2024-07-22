import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import ActorList from "@/components/actor/ActorList.vue";
import { popularActorsMock } from "#/mockData";

describe("ActorList.vue", () => {
  it("renders correctly", async() => {
    const actorListWrapper = mount(ActorList, {
      props: {
        actors: popularActorsMock
      },
      global: {
        stubs: {
          ActorListItem: true
        }
      }
    });

    expect(actorListWrapper.exists()).toBe(true);

    const actorListItemWrapper = actorListWrapper.findAllComponents({ name: "ActorListItem"});

    expect(actorListItemWrapper).toHaveLength(3);
  });
});
