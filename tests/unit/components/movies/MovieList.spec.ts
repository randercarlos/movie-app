import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import MovieList from "@/components/movie/MovieList.vue";
import type { Movie } from "@/typings/interfaces";

describe("MovieList.vue", () => {
  it("renders correctly", async() => {
    const movies: Movie[] = [
      {
        "genres": "Adventure, Action, Science Fiction",
        "id": 823464,
        "overview": "Following their explosive showdown, Godzilla and Kong must reunite against a ",
        "poster_path": "https://image.tmdb.org/t/p/w500//z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        "release_date": "Mar 27, 2024",
        "title": "Godzilla x Kong: The New Empire",
        "vote_average": "72.8%"
      },
      {
        "genres": "Adventure, Action, Science Fiction",
        "id": 653346,
        "overview": "Several generations in the future following Caesar's reign, apes are now ",
        "poster_path": "https://image.tmdb.org/t/p/w500//gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
        "release_date": "May 08, 2024",
        "title": "Kingdom of the Planet of the Apes",
        "vote_average": "71.53%"
      },
      {
        "genres": "Horror, Thriller",
        "id": 1111873,
        "overview": "A group of criminals kidnaps a teenage ballet dancer, the daughter of a ",
        "poster_path": "https://image.tmdb.org/t/p/w500//5gKKSoD3iezjoL7YqZONjmyAiRA.jpg",
        "release_date": "Apr 18, 2024",
        "title": "Abigail",
        "vote_average": "68.82%"
      }
    ];
    const movieListWrapper = mount(MovieList, {
      props: {
        movies: movies
      },
      global: {
        stubs: {
          MovieListItem: true
        }
      }
    });

    expect(movieListWrapper.exists()).toBe(true);

    const movieListItemWrapper = movieListWrapper.findAllComponents({ name: "MovieListItem"});

    expect(movieListItemWrapper).toHaveLength(3);
  });
});
