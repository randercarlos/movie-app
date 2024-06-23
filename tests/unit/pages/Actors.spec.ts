import { describe, expect, it, vi } from "vitest";
import { mount, } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import Actors from "@/pages/Actors.vue";
import nock from "nock";
import CONFIG from "@/config";
import { resolvedPromises } from "@/utils/helper";
import { popularActorsResponseMock }
  from "#/mockData";
import * as usePopularActorsFile from "@/composables/actor/usePopularActors";
import * as handleErrorFile from "@/utils/handleError";

nock(CONFIG.API_BASE_URL)
  .persist()
  .get("/person/popular?page=1")
  .reply(200, popularActorsResponseMock);

const AsyncComponent = defineComponent({
  components: { Actors },
  template: "<Suspense><Actors /></Suspense>"
});

describe("Actors.vue", () => {
  it("renders correctly", async() => {
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

  it("load more actors on scroll bottom", async() => {

    const usePopularActorsSpy = vi.spyOn(usePopularActorsFile, "usePopularActors");

    mount(AsyncComponent, {
      global: {
        stubs: {
          ActorList: true
        }
      }
    });

    // Simulate scroll to bottom
    window.dispatchEvent(new Event("scroll"));

    // Simulate a scroll event that would trigger the bottom scroll logic
    window.pageYOffset = document.documentElement.scrollHeight;

    await resolvedPromises(700);
    await nextTick();

    expect(usePopularActorsSpy).toHaveBeenCalled();
  });

  it("show notification error on fails", async() => {

    vi.spyOn(usePopularActorsFile, "usePopularActors").mockImplementation(() => {
      throw new Error("Popular actors fetch error");
    });
    vi.spyOn(handleErrorFile, "handleError");

    mount(AsyncComponent, {
      global: {
        stubs: {
          ActorList: true
        }
      }
    });

    await resolvedPromises();

    expect(handleErrorFile.handleError).toHaveBeenCalledWith(
      "Error on show actors.",
      new Error("Popular actors fetch error")
    );
  });
});
