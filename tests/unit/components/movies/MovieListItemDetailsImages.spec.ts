import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import MovieListItemDetailsImages from "@/components/movie/MovieListItemDetailsImages.vue";
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
      "file_path": "/fqv8v6AycXKsivp1T5yKtLbGX2e.jpg",
      "vote_average": 5.33,
      "vote_count": 9,
      "width": 3840
    },
    {
      "aspect_ratio": 1.778,
      "height": 2160,
      "iso_639_1": null,
      "file_path": "/fdsff23g8v6AycXKsivp1T5yKtLbGXfe.jpg",
      "vote_average": 5.33,
      "vote_count": 9,
      "width": 3840
    },
    {
      "aspect_ratio": 1.778,
      "height": 2160,
      "iso_639_1": null,
      "file_path": "/fqv8v6AycXKsivp1wedg12e3GXhg.jpg",
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

const wrapper = mount(MovieListItemDetailsImages, {
  attachTo: document.body,
  props: {
    movieDetails
  }
});

describe("MovieListItemDetailsImages.vue", () => {
  it("renders correctly", async() => {
    const movieDetailsImages = movieDetails.images;
    const movieImages = wrapper.findAll("[data-test='movieImageCard'] a img");

    expect(wrapper.findAll("[data-test='movieImageCard']").length).toBe(movieDetailsImages?.length);

    let movieImage = "";
    movieDetailsImages?.forEach((movieDetailsImage, index) => {
      movieImage = `https://image.tmdb.org/t/p/w500/${movieDetailsImage.file_path}`;

      // check if there is a tag <img src=""/>  for each image in movieDetais.images
      expect(movieImages.at(index)?.attributes("src")).toBe(movieImage);
    });
  });

  it("show the movie image modal when movie image is clicked.", async() => {
    const movieDetailsImages = movieDetails.images;
    const movieImageLinks = wrapper.findAll("[data-test='movieImageCard'] a");
    const movieImageModal = wrapper.find("[data-test='movieImageModal']");

    let movieImageOriginal = "";

    expect(movieImageModal.isVisible()).toBe(false);

    movieImageLinks?.forEach(async(movieImageLink, index) => {
      movieImageOriginal = `https://image.tmdb.org/t/p/original/${movieDetailsImages?.
        at(index)?.file_path}`;

      // click on link to open movie image modal
      await movieImageLink.trigger("click");

      // test if movie image modal is visible(v-show)
      expect(wrapper.find("[data-test='movieImageModal']").isVisible()).toBe(true);

      // test if movie image modal is visible with right image
      expect(wrapper.find("[data-test='movieImageModalImg']").attributes("src"))
        .toBe(movieImageOriginal);
    });
  });

  it("hide the movie image modal when the close image button is clicked.", async() => {
    const movieImageLinks = wrapper.findAll("[data-test='movieImageCard'] a");
    const movieImageModal = wrapper.find("[data-test='movieImageModal']");

    movieImageLinks?.forEach(async(movieImageLink) => {

      // click on movie image
      await movieImageLink.trigger("click");

      // click on movie image close button
      await wrapper.find("#movieImageModalCloseButton").trigger("click");

      expect(movieImageModal.isVisible()).toBe(false);
    });
  });

  it("hide the movie image modal when the escape button is clicked.", async() => {
    const movieImageLinks = wrapper.findAll("[data-test='movieImageCard'] a");
    const movieImageModal = wrapper.find("[data-test='movieImageModal']");

    movieImageLinks?.forEach(async(movieImageLink) => {

      // click on movie image to open movie image modal
      await movieImageLink.trigger("click");

      // click on escape button after movie image modal is open
      await movieImageModal.trigger("keydown", { key: "Escape" });

      expect(movieImageModal.isVisible()).toBe(false);
    });
  });

  it("hide the movie image modal when clicked outside it.", async() => {
    const movieImageLinks = wrapper.findAll("[data-test='movieImageCard'] a");
    const movieImageModal = wrapper.find("[data-test='movieImageModal']");

    // click on movie image
    movieImageLinks?.forEach(async(movieImageLink) => {

      // click on movie image to open movie image modal
      await movieImageLink.trigger("click");

      // send mouse click event in document
      document.dispatchEvent(new MouseEvent("click"));

      // await DOM updates
      await nextTick();

      expect(movieImageModal.isVisible()).toBe(false);
    });
  });
});
