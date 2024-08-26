import { describe, expect, it } from "vitest";
import { RouterLinkStub, mount, } from "@vue/test-utils";
import MovieListItem from "@/components/movie/MovieListItem.vue";

describe("MovieListItem.vue", () => {
  it("renders correctly", async() => {
    const wrapper = mount(MovieListItem, {
      props: {
        movie: {
          "id": 823464,
          "title": "Godzilla x Kong: The New Empire",
          "overview": "Following their explosive showdown, Godzilla and Kong must reunite against",
          "genres": "Adventure, Action, Science Fiction",
          "poster_path": "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
          "release_date": "Mar 27, 2024",
          "vote_average": "72.8%"
        }
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
    expect(links.at(0)?.props().to).toEqual({ name: "movie",
      params: { movieId: 823464 } });
    expect(links.at(1)?.props().to).toEqual({ name: "movie",
      params: { movieId: 823464 } });

    expect(img.attributes("src"))
      .toBe("https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg");

    expect(wrapper.text()).toContain("Godzilla x Kong: The New Empire");
    expect(wrapper.text()).toContain("72.8%");
    expect(wrapper.text()).toContain("Mar 27, 2024");
    expect(wrapper.text()).toContain("Adventure, Action, Science Fiction");
  });
});
