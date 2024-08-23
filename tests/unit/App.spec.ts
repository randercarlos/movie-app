/* eslint-disable vue/one-component-per-file */
import ptBR from "@/i18n/locales/pt-BR.json";
import enUS from "@/i18n/locales/en-US.json";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { defineComponent } from "vue";
import {
  createRouterMock,
  injectRouterMock,
} from "vue-router-mock";
import { push } from "notivue";
import PageSkeleton from "@/components/skeleton/PageSkeleton.vue";
import PageDetailsSkeleton from "@/components/skeleton/PageDetailsSkeleton.vue";
import CONFIG from "@/config";
import { changeI18nGlobalLocale, getI18nGlobalLocale } from "./globalSetup.unit";
import { I18nGlobalLocales } from "@/typings/enums";
import { useTitle } from "@vueuse/core";
import * as helperFile from "@/utils/helper";
import { driver } from "driver.js";

const ErrorComponentWithErrorMsg = defineComponent({
  async setup() {
    await Promise.reject(new Error("Oops"));
  },
  template: "Error"
});

const ErrorComponentWithoutErrorMsg = defineComponent({
  async setup() {
    await Promise.reject(new Error(""));
  },
  template: "Error"
});

// create one mock instance, pass options
const router  = createRouterMock({
  spy: {
    create: fn => vi.fn(fn),
    reset: spy => spy.mockClear(),
  },
  routes: [
    { path: "/movies", name: "movies", component: PageSkeleton },
    { path: "/movies/:movieId(\\d+)", name: "movie", component: PageDetailsSkeleton },
    { path: "/error", component: ErrorComponentWithErrorMsg },
    { path: "/error2", component: ErrorComponentWithoutErrorMsg },
  ]
});

describe("App.vue", () => {
  beforeEach(() => {
    // important. Resets the router to previous tests doesn't affect next tests
    router.reset();

    // inject it globally to ensure `useRoute()`, `$route`, etc work
    // properly and give you access to test specific functions
    injectRouterMock(router);

    // closes any opened push notifications opened during tests to not affect subsequent tests
    push.destroyAll();
  });

  it("renders correctly", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          TheHeader: true,
          TheFooter: true,
          RouterView: true,
          Notivue: true
        }
      }
    });
    const header = wrapper.findComponent({ name: "TheHeader" });
    const footer = wrapper.findComponent({ name: "TheFooter" });
    const routerView = wrapper.findComponent({ name: "RouterView" });
    const notivue = wrapper.findComponent({ name: "Notivue" });

    expect(header.exists()).toBe(true);
    expect(footer.exists()).toBe(true);
    expect(routerView.exists()).toBe(true);
    expect(notivue.exists()).toBe(true);
  });

  it("renders movies skeleton correctly", async() => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          TheHeader: true,
          TheFooter: true,
          Notivue: true,
          PageSkeleton: true,
          RouterView: false
        }
      }
    });

    await router.push("/movies");

    const pageSkeleton = wrapper.findComponent({ name: "PageSkeleton" });

    expect(pageSkeleton.exists()).toBe(true);
  });

  it("renders movie skeleton correctly", async() => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          TheHeader: true,
          TheFooter: true,
          Notivue: true,
          PageDetailsSkeleton: true,
          SkeletonLoader: true,
          RouterView: false
        }
      }
    });

    await router.push("/movies/1");

    const pageDetailsSkeleton = wrapper.findComponent({ name: "PageDetailsSkeleton" });

    expect(pageDetailsSkeleton.exists()).toBe(true);
  });

  it("shows error notification alert if error ", async() => {
    const pushSpy = vi.spyOn(push, "error");

    await router.push("/error");

    expect(pushSpy).toHaveBeenCalledWith({
      "title": "Error",
      "message": "Oops",
    });
  });

  it("shows generic error message if error message is not defined", async() => {
    const pushSpy = vi.spyOn(push, "error");

    await router.push("/error2");

    expect(pushSpy).toHaveBeenCalledWith({
      "title": "Error",
      "message": "A error happened. Try again later. If error persists, contact support."
    });
  });

  it("shows generic error message is not in dev mode", async() => {
    const pushSpy = vi.spyOn(push, "error");

    // simulates that is not in dev mode
    CONFIG["APP_IS_DEV"] = false;
    await router.push("/error2");

    expect(pushSpy).toHaveBeenCalledWith({
      "title": "Error",
      "message": "A error happened. Try again later. If error persists, contact support."
    });
  });

  it("updates document titles to en-US when app's locale is changed to en-US", async() => {
    // change global locale to en-US
    changeI18nGlobalLocale(I18nGlobalLocales.enUS);

    await router.push("/movies");

    const title = useTitle();

    expect(title.value).toBe(enUS.general.title);
  });

  it("updates document titles to pt-BR when app's locale is changed to pt-BR", async() => {
    // change global locale to en-US
    changeI18nGlobalLocale(I18nGlobalLocales.ptBR);

    await router.push("/movies");

    const title = useTitle();

    expect(title.value).toBe(ptBR.general.title);
  });

  it("create the tour in the app if not running tests", () => {
    vi.spyOn(helperFile, "isAppRunningTests").mockReturnValue(false);

    vi.mock("driver.js", () => {
      return {
        driver: vi.fn(() => ({
          drive: vi.fn(),
          destroy: vi.fn(),
          hasNextStep: vi.fn().mockReturnValue(false)
        })),
      };
    });

    mount(App, {
      global: {
        stubs: {
          TheHeader: true,
          TheFooter: true,
          Notivue: true,
          PageDetailsSkeleton: true,
          SkeletonLoader: true,
          RouterView: false
        }
      }
    });

    expect(driver).toHaveBeenCalled();
  });

  it("not create the tour in the app if running tests", () => {
    // reset all mocks created by vi.mock() to not affect others tests
    vi.resetAllMocks();

    vi.spyOn(helperFile, "isAppRunningTests").mockReturnValue(true);

    vi.mock("driver.js", () => {
      return {
        driver: vi.fn(() => ({
          drive: vi.fn(),
          destroy: vi.fn(),
          hasNextStep: vi.fn().mockReturnValue(false)
        })),
      };
    });

    mount(App, {
      global: {
        stubs: {
          TheHeader: true,
          TheFooter: true,
          Notivue: true,
          PageDetailsSkeleton: true,
          SkeletonLoader: true,
          RouterView: false
        }
      }
    });

    expect(driver).not.toHaveBeenCalled();
  });

  it("change default application language according to default navigator language", () => {
    // Mock navigator.language
    Object.defineProperty(navigator, "language", {
      value: "pt-BR",
      configurable: true,
    });

    mount(App, {
      global: {
        stubs: {
          TheHeader: true,
          TheFooter: true,
          Notivue: true,
          PageDetailsSkeleton: true,
          SkeletonLoader: true,
          RouterView: false
        }
      }
    });

    expect(getI18nGlobalLocale()).toBe(I18nGlobalLocales.ptBR);

    Object.defineProperty(navigator, "language", {
      value: "en-US",
      configurable: true,
    });

    mount(App, {
      global: {
        stubs: {
          TheHeader: true,
          TheFooter: true,
          Notivue: true,
          PageDetailsSkeleton: true,
          SkeletonLoader: true,
          RouterView: false
        }
      }
    });

    expect(getI18nGlobalLocale()).toBe(I18nGlobalLocales.enUS);
  });
});
