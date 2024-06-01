import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import MovieListItemDetailsInfo from "@/components/movie/MovieListItemDetailsInfo.vue";
import type { MovieDetails } from "@/typings/interfaces";
import { nextTick } from "vue";

const movieDetails: MovieDetails = {
  "id": 653346,
  "title": "Kingdom of the Planet of the Apes",
  "genres": "Science Fiction, Adventure, Action",
  "overview": "Several generations in the future following Caesar's reign, apes are now",
  "poster_path": "https://image.tmdb.org/t/p/w500//gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
  "release_date": "May 08, 2024",
  "vote_average": "71.78%",
  "credits": {
    "cast": [
      {
        "adult": false,
        "gender": 2,
        "id": 1586047,
        "known_for_department": "Acting",
        "name": "Owen Teague",
        "original_name": "Owen Teague",
        "popularity": 22.083,
        "profile_path": "/tgCkGE0LIggyjMmgSwHhpZAkfJs.jpg",
        "cast_id": 9,
        "character": "Noa",
        "credit_id": "630449a821118f007d331afa",
        "order": 0
      },

    ],
    "crew": [
      {
        "adult": false,
        "gender": 2,
        "id": 1179066,
        "known_for_department": "Directing",
        "name": "Wes Ball",
        "original_name": "Wes Ball",
        "popularity": 11.275,
        "profile_path": "/zVPXrhuAxYAWlwDEWCaqeUPycFx.jpg",
        "credit_id": "5de6f63611386c001354710d",
        "department": "Directing",
        "job": "Director"
      }
    ]
  },
  "videos": {
    "results": [
      {
        "iso_639_1": "en",
        "iso_3166_1": "US",
        "name": "Movie Magic",
        "key": "PWg--s7whu8",
        "site": "YouTube",
        "size": 1080,
        "type": "Behind the Scenes",
        "official": true,
        "published_at": "2024-05-22T16:00:19.000Z",
        "id": "664e1b58e76e411f12639824"
      }
    ]
  },
  "images": [
    {
      "aspect_ratio": 1.778,
      "height": 2160,
      "iso_639_1": null,
      "file_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
      "vote_average": 5.33,
      "vote_count": 9,
      "width": 3840
    },

  ],
  "crew": [
    {
      "adult": false,
      "gender": 2,
      "id": 1179066,
      "known_for_department": "Directing",
      "name": "Wes Ball",
      "original_name": "Wes Ball",
      "popularity": 11.275,
      "profile_path": "/zVPXrhuAxYAWlwDEWCaqeUPycFx.jpg",
      "credit_id": "5de6f63611386c001354710d",
      "department": "Directing",
      "job": "Director"
    }
  ],
  "cast": [
    {
      "adult": false,
      "gender": 2,
      "id": 1586047,
      "known_for_department": "Acting",
      "name": "Owen Teague",
      "original_name": "Owen Teague",
      "popularity": 22.083,
      "profile_path": "https://image.tmdb.org/t/p/w300/tgCkGE0LIggyjMmgSwHhpZAkfJs.jpg",
      "cast_id": 9,
      "character": "Noa",
      "credit_id": "630449a821118f007d331afa",
      "order": 0
    }
  ]
};

const wrapper = mount(MovieListItemDetailsInfo, {
  props: {
    movieDetails
  }
});

describe("MovieListItemDetailsInfo.vue", () => {
  it("renders correctly", async() => {
    const imagePostPath = wrapper.get(".movie-info img");

    expect(imagePostPath.attributes("src")).toBe(movieDetails.poster_path);

    expect(wrapper.text()).toContain(movieDetails.title);
    expect(wrapper.text()).toContain(movieDetails.vote_average);
    expect(wrapper.text()).toContain(movieDetails.release_date);
    expect(wrapper.text()).toContain(movieDetails.genres);
    expect(wrapper.text()).toContain(movieDetails.overview);

    movieDetails.crew.forEach(crew => {
      expect(wrapper.text()).toContain(crew.name);
      expect(wrapper.text()).toContain(crew.job);
    });
  });

  it("show the play trailer button if there is a video to show", async() => {
    const movieTrailerButton = wrapper.find("#movieTrailerButton");

    expect(movieTrailerButton.exists()).toBe(true);
  });

  it("hide the play trailer button if there is no video to show.", async() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { videos, ...movieDetailsWithoutVideo } = movieDetails;
    const wrapper = mount(MovieListItemDetailsInfo, {
      props: {
        movieDetails: movieDetailsWithoutVideo
      }
    });

    const movieTrailerButton = wrapper.find("#movieTrailerButton");

    expect(movieTrailerButton.exists()).toBe(false);
  });

  it("show the movie trailer modal when the play trailer button is clicked.", async() => {
    const movieTrailerButton = wrapper.find("#movieTrailerButton");

    expect(wrapper.find("#movieTrailerModal").exists()).toBe(false);

    await movieTrailerButton.trigger("click");

    expect(wrapper.find("#movieTrailerModal").exists()).toBe(true);

    expect(wrapper.find("iframe").attributes("src"))
      .toBe(`https://www.youtube.com/embed/${movieDetails?.videos?.results[0]?.key}`);
  });

  it("hide the movie trailer modal when the close trailer button is clicked.", async() => {
    const movieTrailerButton = wrapper.find("#movieTrailerButton");
    await movieTrailerButton.trigger("click");

    expect(wrapper.find("#movieTrailerModal").exists()).toBe(true);

    await wrapper.find("#movieTrailerModalCloseButton").trigger("click");

    expect(wrapper.find("#movieTrailerModal").exists()).toBe(false);
  });

  it("hide the movie trailer modal when the escape button is pressed.", async() => {
    const movieTrailerButton = wrapper.find("#movieTrailerButton");
    await movieTrailerButton.trigger("click");

    const movieTrailerModal = wrapper.find("#movieTrailerModal");
    await movieTrailerModal.trigger("keydown", { key: "Escape" });

    expect(wrapper.find("#movieTrailerModal").exists()).toBe(false);
  });

  it("hide the movie trailer modal when clicked outside it.", async() => {
    const movieTrailerButton = wrapper.find("#movieTrailerButton");
    await movieTrailerButton.trigger("click");

    // send mouse click event in document
    document.dispatchEvent(new MouseEvent("click"));

    // await DOM updates
    await nextTick();

    expect(wrapper.find("#movieTrailerModal").exists()).toBe(false);
  });

});
