import { actorDetailsResponseMock } from "#/mockData";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Actor from "@/pages/Actor.vue";
import { defineComponent } from "vue";
import { resolvedPromises } from "@/utils/helper";
import CONFIG from "@/config";
import nock from "nock";
import * as handleErrorFile from "@/utils/handleError";
import * as useActorDetailsFile from "@/composables/actor/useActorDetails";

vi.mock("vue-router", () => ({
  useRoute: vi.fn().mockReturnValue({
    params: {
      actorId: 1
    }
  }),
}));

nock(CONFIG.API_BASE_URL)
  .persist()
  .get("/person/1?append_to_response=images,external_ids,combined_credits")
  .reply(200, actorDetailsResponseMock);

const AsyncComponent = defineComponent({
  components: { Actor },
  template: "<Suspense><Actor /></Suspense>"
});

describe("Actor.vue", () => {
  it("renders correctly", async() => {
    const suspenseWrapper = mount(AsyncComponent,{
      global: {
        stubs: {
          ActorListItemDetails: true
        }
      }
    });

    await resolvedPromises();

    const actorWrapper = suspenseWrapper
      .findComponent({ name: "ActorListItemDetails"});

    expect(actorWrapper.exists()).toBe(true);
  });


  it("show notification error on fails", async() => {
    vi.spyOn(useActorDetailsFile, "useActorDetails")
      .mockImplementation(() => {
        throw new Error("Actor details fetch error");
      });

    vi.spyOn(handleErrorFile, "handleError");

    mount(AsyncComponent, {
      global: {
        stubs: {
          ActorListItemDetails: true
        }
      }
    });

    expect(handleErrorFile.handleError).toHaveBeenCalledWith(
      "Error on show actor.",
      new Error("Actor details fetch error")
    );
  });
});
