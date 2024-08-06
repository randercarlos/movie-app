import { describe, expect, it } from "vitest";
import { RouterLinkStub, mount, } from "@vue/test-utils";
import ActorListItemDetailsCredits from "@/components/actor/ActorListItemDetailsCredits.vue";
import { actorDetailsMock } from "#/mockData";
import type { ActorDetailsCredits } from "@/typings/interfaces";
import { getYearFromDate } from "@/utils/helper";
import { changeI18nGlobalLocale } from "#/unit/globalSetup.unit";
import { I18nGlobalLocales } from "@/typings/enums";
import ptBR from "@/i18n/locales/pt-BR.json";
import enUS from "@/i18n/locales/en-US.json";

describe("ActorListItemDetailsCredits.vue", () => {
  it("renders correctly", async() => {
    const wrapper = mount(ActorListItemDetailsCredits, {
      props: {
        actorDetails: actorDetailsMock
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    // Ensure the component renders the correct number of cast members
    const actorListItems = wrapper.findAll("ul li");
    const actorListItemsLinks = wrapper.findAllComponents({ name: "RouterLinkStub" });

    expect(actorListItems.length).toBe(actorDetailsMock.credits.length);

    actorDetailsMock.credits?.forEach((actorDetailsCredit: ActorDetailsCredits, index) => {
      expect(actorListItems?.at(index)?.text()).toContain(
        actorDetailsCredit.release_year || getYearFromDate(actorDetailsCredit?.first_air_date)
      );
      expect(actorListItemsLinks?.at(index)?.props("to")).toEqual({
        name: actorDetailsCredit.media_type === "movie" ? "movie" : "tvShow",
        params: {
          [actorDetailsCredit.media_type === "movie" ? "movieId" : "tvShowId"]:
            actorDetailsCredit?.id
        }
      });
    });
  });

  it("show texts in en-US locale(default)", () => {
    const wrapper = mount(ActorListItemDetailsCredits, {
      props: {
        actorDetails: actorDetailsMock
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    expect(wrapper.text()).toContain(enUS.actor.credits);
    expect(wrapper.text()).toContain(enUS.actor.as);
  });

  it("show texts in pt-BR locale", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.ptBR);

    const wrapper = mount(ActorListItemDetailsCredits, {
      props: {
        actorDetails: actorDetailsMock
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    expect(wrapper.text()).toContain(ptBR.actor.credits);
    expect(wrapper.text()).toContain(ptBR.actor.as);
  });
});
