import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import TvShowList from "@/components/tv-show/TvShowList.vue";
import type { TvShow } from "@/typings/interfaces";

describe("TvShowList.vue", () => {
  it("renders correctly", async() => {
    const tvShows: TvShow[] = [
      {
        "first_air_date": "Oct 03, 2000",
        "genre_ids": [16, 35, 18, 10759],
        "genres": "Animation, Drama, Comedy, Action & Adventure",
        "id": 42705,
        "name": "Fighting Spirit",
        "overview": "Makunouchi Ippo is an ordinary high school student in Japan. Since he spends ",
        "poster_path": "https://image.tmdb.org/t/p/w500/i3U3J2MWovIBZBnZYYiOLBXqNJZ.jpg",
        "vote_average": "86.59%"
      },
      {
        "first_air_date": "Jun 18, 2022",
        "genre_ids": [10765, 18, 10759, 9648],
        "genres": "Drama, Mystery, Action & Adventure, Sci-Fi & Fantasy",
        "id": 135157,
        "name": "Alchemy of Souls",
        "overview": "A powerful sorceress in a blind woman's body encounters a man from a ",
        "poster_path": "https://image.tmdb.org/t/p/w500/q2IiPRSXPOZ6qVRj36WRAYEQyHs.jpg",
        "vote_average": "87%"
      }
    ];
    const movieListWrapper = mount(TvShowList, {
      props: {
        tvShows: tvShows
      },
      global: {
        stubs: {
          TvShowListItem: true
        }
      }
    });

    expect(movieListWrapper.exists()).toBe(true);

    const movieListItemWrapper = movieListWrapper.findAllComponents({ name: "TvShowListItem"});

    expect(movieListItemWrapper).toHaveLength(2);
  });
});
