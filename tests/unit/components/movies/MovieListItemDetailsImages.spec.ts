import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import MovieListItemDetailsImages from "@/components/movie/MovieListItemDetailsImages.vue";
import { nextTick } from "vue";
import { movieDetailsMock } from "#/mockData";

const movieDetails = movieDetailsMock;

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
      movieImage = `https://image.tmdb.org/t/p/w500${movieDetailsImage.file_path}`;

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
      movieImageOriginal = `https://image.tmdb.org/t/p/original${movieDetailsImages?.
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
