import { truncateString } from "@/utils/helper";
import { describe, expect, it } from "vitest";
import { RouterLinkStub, mount, } from "@vue/test-utils";
import ActorListItem from "@/components/actor/ActorListItem.vue";
import { popularActorsMock } from "#/mockData";

describe("ActorListItem.vue", () => {
  it("renders correctly", async() => {
    const actor = popularActorsMock.at(0);
    const wrapper = mount(ActorListItem, {
      props: {
        actor: actor
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const links = wrapper.findAllComponents(RouterLinkStub);
    const img = wrapper.get("img");

    expect(links).toHaveLength(2);
    expect(links.at(0)?.props().to).toEqual({
      name: "actor",
      params: { actorId: actor?.id }
    });
    expect(links.at(1)?.props().to).toEqual({
      name: "actor",
      params: { actorId: actor?.id  }
    });

    expect(img.attributes("src")).toBe(actor?.profile_path);
    expect(wrapper.text()).toContain(actor?.name);
    expect(wrapper.text()).toContain(truncateString(actor?.known_for as string, 35));
  });
});
