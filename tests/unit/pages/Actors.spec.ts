import { describe, expect, it, vi } from "vitest";
import { mount, } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import Actors from "@/pages/Actors.vue";
import nock from "nock";
import CONFIG from "@/config";
import { resolvedPromises } from "@/utils/helper";
import { popularActorsResponseMock }
  from "#/mockData";
import * as handleErrorFile from "@/utils/handleError";

const AsyncComponent = defineComponent({
  components: { Actors },
  template: "<Suspense><Actors /></Suspense>"
});

describe("Actors.vue", () => {
  it("renders correctly", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/person/popular")
      .query(true)
      .reply(200, popularActorsResponseMock);
    const suspenseWrapper = mount(AsyncComponent, {
      global: {
        stubs: {
          ActorList: true
        }
      }
    });

    await resolvedPromises();

    const actorsWrapper = suspenseWrapper.findComponent({ name: "Actors"});

    expect(actorsWrapper.exists()).toBe(true);
    expect(actorsWrapper.html()).toContain("Popular Actors");
  });

  it("renders actors list", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/person/popular")
      .query(true)
      .reply(200, popularActorsResponseMock);
    const suspenseWrapper = mount(AsyncComponent, {
      global: {
        stubs: {
          ActorList: true
        }
      }
    });

    await resolvedPromises();

    const actorsWrapper = suspenseWrapper.findComponent({ name: "ActorList"});

    expect(actorsWrapper.exists()).toBe(true);
  });

  it("shows spinner on load more actors when user scroll bottom", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/person/popular")
      .times(2)
      .query(true)
      .reply(200, popularActorsResponseMock);
    const wrapper = mount(AsyncComponent, {
      global: {
        stubs: {
          ActorList: true
        }
      }
    });

    await resolvedPromises(50);

    // Simulate a scroll event that would trigger the bottom scroll logic
    document.dispatchEvent(new Event("scroll"));

    await nextTick();

    expect(wrapper.find(".spinner-wrapper").exists()).toBe(true);
  });

  it("load more actors on scroll bottom", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/person/popular")
      .times(3)
      .query(true)
      .reply(200, popularActorsResponseMock);
    const wrapper = mount(AsyncComponent, {
      global: {
        stubs: {
          ActorList: true
        }
      }
    });

    // wait 200ms because watchDebounce
    await resolvedPromises(200);

    const actorListWrapper = wrapper.findComponent({ name: "ActorList" });

    // must have 3 actors on list initially because was given a list with 3 actors
    expect(actorListWrapper.props().actors).toHaveLength(3);

    // Simulate a scroll event that would trigger the bottom scroll logic
    document.dispatchEvent(new Event("scroll"));

    // wait 200ms because watchDebounce
    await resolvedPromises(200);

    // must have 6 actors on list because onScrollBottom loaded more 3 actors on actors list
    expect(actorListWrapper.props().actors).toHaveLength(6);
  });

  it("show notification error on fails", async() => {
    nock(CONFIG.API_BASE_URL)
      .get("/person/popular")
      .query(true)
      .replyWithError("Error on load popular actors");

    const handleErrorSpy = vi.spyOn(handleErrorFile, "handleError");

    mount(AsyncComponent, {
      global: {
        stubs: {
          ActorList: true
        }
      }
    });

    // wait 200ms because watchDebounce
    await resolvedPromises(200);

    expect(handleErrorSpy).toHaveBeenCalled();
  });
});
