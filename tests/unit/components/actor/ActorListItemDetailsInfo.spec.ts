import { actorDetailsMock, actorDetailsWithoutSocialMock } from "#/mockData";
import { describe, expect, it } from "vitest";
import { RouterLinkStub, mount, } from "@vue/test-utils";
import ActorListItemDetailsInfo from "@/components/actor/ActorListItemDetailsInfo.vue";
import type { ActorDetails, ActorDetailsMovies } from "@/typings/interfaces";
import { I18nGlobalLocales } from "@/typings/enums";
import { changeI18nGlobalLocale } from "#/unit/globalSetup.unit";
import ptBR from "@/i18n/locales/pt-BR.json";
import enUS from "@/i18n/locales/en-US.json";

const actorDetails = { ...actorDetailsMock };

describe("ActorListItemDetailsInfo.vue", () => {
  it("renders correctly", async() => {
    const wrapper = mount(ActorListItemDetailsInfo, {
      props: {
        actorDetails
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const actorImageProfilePath = wrapper.get(".actor-info img");
    expect(actorImageProfilePath.attributes("src")).toBe(actorDetails.actor.profile_path);


    expect(wrapper.text()).toContain(actorDetails.actor?.name);
    expect(wrapper.text()).toContain(actorDetails.actor?.birthday);
    expect(wrapper.text()).toContain(actorDetails.actor?.age);
    expect(wrapper.text()).toContain(actorDetails.actor?.place_of_birth);
    expect(wrapper.text()).toContain(actorDetails.actor?.biography);

    let index = 0;
    const knownForMoviesImages = wrapper.findAll(".known-for-movies a img");
    const knownForMoviesLinks = wrapper.findAllComponents({ name: "RouterLinkStub" });
    actorDetails.knownForMovies.forEach((actorDetailsMovie: ActorDetailsMovies) => {

      expect(wrapper.text()).toContain(actorDetailsMovie.title);
      expect(knownForMoviesImages?.at(index)?.attributes("src"))
        .toBe(actorDetailsMovie.poster_path);

      expect(knownForMoviesLinks?.at(index + 1)?.props().to).toEqual({
        name: actorDetailsMovie.media_type === "movie" ? "movie" : "tvShow",
        params: {
          [actorDetailsMovie.media_type === "movie" ? "movieId" : "tvShowId"]: actorDetailsMovie.id
        }
      });
      index++;
    });
  });

  it("renders socials media", async() => {
    const wrapper = mount(ActorListItemDetailsInfo, {
      props: {
        actorDetails
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const socialMediasLinks = wrapper.findAll("ul li a");

    socialMediasLinks.forEach(link => console.log(link.attributes("href")));
    console.log(actorDetailsMock.social.facebook);
    expect(socialMediasLinks.at(0)?.attributes("href")).toBe(actorDetailsMock.social.facebook);
    expect(socialMediasLinks.at(1)?.attributes("href")).toBe(actorDetailsMock.social.instagram);
    expect(socialMediasLinks.at(2)?.attributes("href")).toBe(actorDetailsMock.social.twitter);
    expect(socialMediasLinks.at(3)?.attributes("href")).toBe(actorDetailsMock.social.youtube);
    expect(socialMediasLinks.at(4)?.attributes("href")).toBe(actorDetailsMock.social.tiktok);
    expect(socialMediasLinks.at(5)?.attributes("href")).toBe(actorDetailsMock.social.wikipedia);
    expect(socialMediasLinks.at(6)?.attributes("href")).toBe(actorDetailsMock.actor.homepage);
  });

  it("renders no socials media", async() => {
    const wrapper = mount(ActorListItemDetailsInfo, {
      props: {
        actorDetails: actorDetailsWithoutSocialMock as ActorDetails
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const socialMediasLinks = wrapper.findAll("ul li a");

    expect(socialMediasLinks).toHaveLength(0);
  });

  it("show texts in en-US locale(default)", () => {
    const wrapper = mount(ActorListItemDetailsInfo, {
      props: {
        actorDetails
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    expect(wrapper.text()).toContain(enUS.actor.yearsOld);
    expect(wrapper.text()).toContain(enUS.actor.in);
    expect(wrapper.text()).toContain(enUS.actor.knownFor);
  });

  it("show texts in pt-BR locale", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.ptBR);

    const wrapper = mount(ActorListItemDetailsInfo, {
      props: {
        actorDetails
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    expect(wrapper.text()).toContain(ptBR.actor.yearsOld);
    expect(wrapper.text()).toContain(ptBR.actor.in);
    expect(wrapper.text()).toContain(ptBR.actor.knownFor);
  });
});
