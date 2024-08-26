import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import MovieListItemDetails from "@/components/movie/MovieListItemDetails.vue";

describe("MovieListItemDetails.vue", () => {
  it("renders correctly", async() => {
    const wrapper = mount(MovieListItemDetails, {
      props: {
        movieDetails: {
          "genres": "Science Fiction, Adventure, Action",
          "id": 653346,
          "overview": "Several generations in the future following Caesar's reign, apes are now ",
          "poster_path": "https://image.tmdb.org/t/p/w500//gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
          "release_date": "May 08, 2024",
          "title": "Kingdom of the Planet of the Apes",
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
        }
      },
      global: {
        stubs: {
          MovieListItemDetailsInfo: true,
          MovieListItemDetailsCast: true,
          MovieListItemDetailsImages: true
        }
      }
    });

    const wrapperMovieListItemDetailsInfo = wrapper
      .findComponent({ name: "MovieListItemDetailsInfo" });
    const wrapperMovieListItemDetailsCast = wrapper
      .findComponent({ name: "MovieListItemDetailsCast" });
    const wrapperMovieListItemDetailsImages = wrapper
      .findComponent({ name: "MovieListItemDetailsImages" });

    expect(wrapperMovieListItemDetailsInfo.exists()).toBe(true);
    expect(wrapperMovieListItemDetailsCast.exists()).toBe(true);
    expect(wrapperMovieListItemDetailsImages.exists()).toBe(true);
  });
});
