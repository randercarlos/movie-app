/* eslint-disable vue/one-component-per-file */
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

const ErrorComponent = defineComponent({
  async setup() {
    await Promise.reject(new Error("Oops"));
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
    { path: "/error", component: ErrorComponent }
  ]
});

describe("App.vue", () => {

  beforeEach(() => {
    // inject it globally to ensure `useRoute()`, `$route`, etc work
    // properly and give you access to test specific functions
    injectRouterMock(router);
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

  it("show error notification alert if error ", async() => {
    const pushSpy = vi.spyOn(push, "error");

    await router.push("/error");

    expect(pushSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledWith({
      "title": "Error",
      "message": "Oops",
    });
  });
});
