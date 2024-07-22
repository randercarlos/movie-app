import { describe, expect, it } from "vitest";
import { RouterLinkStub, VueWrapper, mount } from "@vue/test-utils";
import { I18nGlobalLocales  } from "@/typings/enums";
import HeaderDropdown from "@/components/inputs/HeaderDropdown.vue";
import { changeI18nGlobalLocale } from "#/unit/setupTests";
import enUS from "@/i18n/locales/en-US.json";
import ptBR from "@/i18n/locales/pt-BR.json";
import { nextTick } from "vue";
import nock from "nock";
import CONFIG from "@/config";
import { emptyMultiSearchResponseMock, multiSearchResponseMock } from "#/mockData";
import { resolvedPromises } from "@/utils/helper";
import type {
  MultiSearchActorResponseResult,
  MultiSearchMovieResponseResult,
  MultiSearchTvShowResponseResult
} from "@/typings/interfaces";

async function openSearchDropdown(wrapper: VueWrapper): Promise<void> {
  await wrapper.find("#searchDropdownWrapper").trigger("click");
}

describe("HeaderDropdown.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    const dropdownInput = wrapper.find("#searchDropdownInput");
    const icon = wrapper.find("svg");

    expect(dropdownInput.exists()).toBe(true);
    expect(icon.exists()).toBe(true);
  });

  it("get focus on pressing '/'", async() => {
    const wrapper = mount(HeaderDropdown, {
      attachTo: document.body,
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    // Simulate user pressing '/' button
    document.dispatchEvent(new KeyboardEvent("keypress", {
      key: "/",
      keyCode: 191, // 191 is the keycode for '/'
      code: "Slash",
      which: 191,
      bubbles: true
    }));

    await nextTick();

    const dropdownInputElement = wrapper.find("#searchDropdownInput").element;

    expect(dropdownInputElement).toBe(document.activeElement);
  });

  it("open search dropdown on pressing '/' keyboard button", async() => {
    const wrapper = mount(HeaderDropdown, {
      attachTo: document.body,
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    // Simulate user pressing '/' button
    document.dispatchEvent(new KeyboardEvent("keypress", {
      key: "/",
      keyCode: 191, // 191 is the keycode for '/'
      code: "Slash",
      which: 191,
      bubbles: true
    }));

    await nextTick();

    const searchDropdownResults = wrapper.find("#searchDropdownResults");

    expect(searchDropdownResults.isVisible()).toBe(true);
  });

  it("open search dropdown on click on it", async() => {
    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const searchDropdownWrapper = wrapper.find("#searchDropdownWrapper");
    const searchDropdownResults = wrapper.find("#searchDropdownResults");

    await searchDropdownWrapper.trigger("click");

    expect(searchDropdownResults.isVisible()).toBe(true);
  });

  it("close search dropdown on pressing 'esc' keyboard button", async() => {
    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    openSearchDropdown(wrapper);

    const searchDropdownInput = wrapper.find("#searchDropdownInput");
    const searchDropdownResults = wrapper.find("#searchDropdownResults");

    await searchDropdownInput.trigger("keydown.esc") ;

    expect(searchDropdownResults.isVisible()).toBe(false);
  });

  it("close search dropdown on pressing 'shift' and 'tab' keyboard buttons", async() => {
    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    openSearchDropdown(wrapper);

    const searchDropdownInput = wrapper.find("#searchDropdownInput");
    const searchDropdownResults = wrapper.find("#searchDropdownResults");

    await searchDropdownInput.trigger("keydown.shift.tab") ;

    expect(searchDropdownResults.isVisible()).toBe(false);
  });

  it("close search dropdown on pressing 'tab' keyboard button on last dropdown item", async() => {
    const search = "titanic";
    nock(CONFIG.API_BASE_URL)
      .get("/search/multi")
      .query({ query: search })
      .reply(200, multiSearchResponseMock);

    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const dropdownInput = wrapper.find("#searchDropdownInput");
    await dropdownInput.setValue(search);

    await resolvedPromises(1000);

    openSearchDropdown(wrapper);

    const searchDropdownResults = wrapper.find("#searchDropdownResults");
    const links = wrapper.findAllComponents(RouterLinkStub);

    const lastLink = links.at(links.length - 1);

    // triggers keydown on 'tab' keyboard button on last link
    await lastLink?.trigger("keydown.tab");

    expect(searchDropdownResults.isVisible()).toBe(false);
  });

  it("close search dropdown on clicking outside of search dropdown", async() => {
    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    openSearchDropdown(wrapper);

    const searchDropdownResults = wrapper.find("#searchDropdownResults");

    // click outside the element
    document.dispatchEvent(new MouseEvent("click"));

    expect(searchDropdownResults.isVisible()).toBe(false);
  });

  it("does not perform a search with less than 3 characters", async() => {
    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const dropdownInput = wrapper.find("#searchDropdownInput");
    await dropdownInput.setValue("a");

    const searchDropdownNoResults = wrapper.find("#searchDropdownNoResults");

    expect(searchDropdownNoResults.exists()).toBe(true);

    await dropdownInput.setValue("ab");
    expect(searchDropdownNoResults.exists()).toBe(true);
  });

  it("performs a search with 3 characters or more", async() => {
    const search = "sdfsdfs";
    nock(CONFIG.API_BASE_URL)
      .get("/search/multi")
      .query({ query: search })
      .reply(200, emptyMultiSearchResponseMock);

    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const dropdownInput = wrapper.find("#searchDropdownInput");
    await dropdownInput.setValue(search);

    await resolvedPromises(1000);

    const searchDropdownNoResults = wrapper.find("#searchDropdownNoResults");

    expect(searchDropdownNoResults.exists()).toBe(true);
  });

  it("shows no results to search 'sdfsdfs'", async() => {
    const search = "sdfsdfs";
    nock(CONFIG.API_BASE_URL)
      .get("/search/multi")
      .query({ query: search })
      .reply(200, emptyMultiSearchResponseMock);

    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const dropdownInput = wrapper.find("#searchDropdownInput");
    await dropdownInput.setValue(search);

    await resolvedPromises(1000);

    const searchDropdownNoResults = wrapper.find("#searchDropdownNoResults");

    expect(searchDropdownNoResults.exists()).toBe(true);
  });

  it("shows results to search 'titanic'", async() => {
    const search = "titanic";
    nock(CONFIG.API_BASE_URL)
      .get("/search/multi")
      .query({ query: search })
      .reply(200, multiSearchResponseMock);

    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const dropdownInput = wrapper.find("#searchDropdownInput");
    await dropdownInput.setValue(search);

    await resolvedPromises(1000);

    const results = wrapper.findAll("ul li");
    const resultslinks = wrapper.findAllComponents(RouterLinkStub);
    const images = wrapper.findAll("ul li a img");
    const mediaNames = wrapper.findAll("ul li a span");

    expect(results).toHaveLength(3);
    expect(resultslinks?.at(0)?.props().to).toEqual({
      name: "movie",
      params: { movieId: multiSearchResponseMock.results[0].id }
    });
    expect(resultslinks?.at(1)?.props().to).toEqual({
      name: "tvShow",
      params: { tvShowId: multiSearchResponseMock.results[1].id }
    });
    expect(resultslinks?.at(2)?.props().to).toEqual({
      name: "actor",
      params: { actorId: multiSearchResponseMock.results[2].id }
    });
    expect(images?.at(0)?.attributes("src")).toContain(
      (multiSearchResponseMock.results[0] as MultiSearchMovieResponseResult)?.poster_path
    );
    expect(images?.at(1)?.attributes("src")).toContain(
      (multiSearchResponseMock.results[1] as MultiSearchTvShowResponseResult)?.poster_path
      ?? "https://placehold.co"
    );
    expect(images?.at(2)?.attributes("src")).toContain(
      (multiSearchResponseMock.results[2] as MultiSearchActorResponseResult)?.profile_path
    );
    expect(mediaNames?.at(0)?.text()).toBe(
      (multiSearchResponseMock.results[0] as MultiSearchMovieResponseResult)?.title
    );
    expect(mediaNames?.at(1)?.text()).toBe(
      (multiSearchResponseMock.results[1] as MultiSearchTvShowResponseResult)?.name
    );
    expect(mediaNames?.at(2)?.text()).toBe(
      (multiSearchResponseMock.results[2] as MultiSearchActorResponseResult)?.name
    );
  });

  it("show texts in en-US locale(default)", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.enUS);

    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    const dropdownInput = wrapper.find("#searchDropdownInput");
    const searchDropdownNoResults = wrapper.find("#searchDropdownNoResults");

    expect(dropdownInput.attributes("placeholder")).toBe(enUS.header.search.placeholder);
    expect(searchDropdownNoResults.text()).toContain(enUS.header.search.noResults);
  });

  it("show texts in pt-BR locale", () => {
    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.ptBR);

    const wrapper = mount(HeaderDropdown, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const dropdownInput = wrapper.find("#searchDropdownInput");
    const searchDropdownNoResults = wrapper.find("#searchDropdownNoResults");

    expect(dropdownInput.attributes("placeholder")).toBe(ptBR.header.search.placeholder);
    expect(searchDropdownNoResults.text()).toContain(ptBR.header.search.noResults);
  });
});
