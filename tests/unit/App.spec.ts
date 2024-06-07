/* eslint-disable vue/one-component-per-file */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { defineComponent } from "vue";
import {
  createRouterMock,
  injectRouterMock,
} from "vue-router-mock";
import MoviesSkeleton from "@/components/skeleton/MoviesSkeleton.vue";
import MovieSkeleton from "@/components/skeleton/MovieSkeleton.vue";
import { push } from "notivue";

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
    { path: "/movies", name: "movies", component: MoviesSkeleton },
    { path: "/movies/:movieId(\\d+)", name: "movie", component: MovieSkeleton },
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
          MoviesSkeleton: true,
          RouterView: false
        }
      }
    });

    await router.push("/movies");

    const moviesSkeleton = wrapper.findComponent({ name: "MoviesSkeleton" });

    expect(moviesSkeleton.exists()).toBe(true);
  });

  it("renders movie skeleton correctly", async() => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          TheHeader: true,
          TheFooter: true,
          Notivue: true,
          MovieSkeleton: true,
          RouterView: false
        }
      }
    });

    await router.push("/movies/1");

    const movieSkeleton = wrapper.findComponent({ name: "MovieSkeleton" });

    expect(movieSkeleton.exists()).toBe(true);
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
