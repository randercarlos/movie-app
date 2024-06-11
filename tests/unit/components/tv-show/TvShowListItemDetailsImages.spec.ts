import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import TvShowListItemDetailsImages from "@/components/tv-show/TvShowListItemDetailsImages.vue";
import type { TvShowDetails } from "@/typings/interfaces";
import { nextTick } from "vue";
import { tvShowDetailsMock } from "#/mockData";

const tvShowDetails: TvShowDetails = tvShowDetailsMock;

const wrapper = mount(TvShowListItemDetailsImages, {
  attachTo: document.body,
  props: {
    tvShowDetails
  }
});

describe("TvShowListItemDetailsImages.vue", () => {
  it("renders correctly", async() => {
    const tvShowDetailsImages = tvShowDetails.images;
    const tvShowImages = wrapper.findAll("[data-test='tvShowImageCard'] a img");

    expect(wrapper.findAll("[data-test='tvShowImageCard']").length)
      .toBe(tvShowDetailsImages?.length);

    let tvShowImage = "";
    tvShowDetailsImages?.forEach((tvShowDetailsImage, index) => {
      tvShowImage = `https://image.tmdb.org/t/p/w500/${tvShowDetailsImage.file_path}`;

      // check if there is a tag <img src=""/>  for each image in tvShowDetais.images
      expect(tvShowImages.at(index)?.attributes("src")).toBe(tvShowImage);
    });
  });

  it("show the tv show image modal when tvShow image is clicked.", async() => {
    const tvShowDetailsImages = tvShowDetails.images;
    const tvShowImageLinks = wrapper.findAll("[data-test='tvShowImageCard'] a");
    const tvShowImageModal = wrapper.find("[data-test='tvShowImageModal']");

    let tvShowImageOriginal = "";

    expect(tvShowImageModal.isVisible()).toBe(false);

    tvShowImageLinks?.forEach(async(tvShowImageLink, index) => {
      tvShowImageOriginal = `https://image.tmdb.org/t/p/original/${tvShowDetailsImages?.
        at(index)?.file_path}`;

      // click on link to open tvShow image modal
      await tvShowImageLink.trigger("click");

      // test if tvShow image modal is visible(v-show)
      expect(wrapper.find("[data-test='tvShowImageModal']").isVisible()).toBe(true);

      // test if tvShow image modal is visible with right image
      expect(wrapper.find("[data-test='tvShowImageModalImg']").attributes("src"))
        .toBe(tvShowImageOriginal);
    });
  });

  it("hide the tv show image modal when the close image button is clicked.", async() => {
    const tvShowImageLinks = wrapper.findAll("[data-test='tvShowImageCard'] a");
    const tvShowImageModal = wrapper.find("[data-test='tvShowImageModal']");

    tvShowImageLinks?.forEach(async(tvShowImageLink) => {

      // click on tvShow image
      await tvShowImageLink.trigger("click");

      // click on tvShow image close button
      await wrapper.find("#tvShowImageModalCloseButton").trigger("click");

      expect(tvShowImageModal.isVisible()).toBe(false);
    });
  });

  it("hide the tv show image modal when the escape button is clicked.", async() => {
    const tvShowImageLinks = wrapper.findAll("[data-test='tvShowImageCard'] a");
    const tvShowImageModal = wrapper.find("[data-test='tvShowImageModal']");

    tvShowImageLinks?.forEach(async(tvShowImageLink) => {

      // click on tvShow image to open tvShow image modal
      await tvShowImageLink.trigger("click");

      // click on escape button after tvShow image modal is open
      await tvShowImageModal.trigger("keydown", { key: "Escape" });

      expect(tvShowImageModal.isVisible()).toBe(false);
    });
  });

  it("hide the tv show image modal when clicked outside it.", async() => {
    const tvShowImageLinks = wrapper.findAll("[data-test='tvShowImageCard'] a");
    const tvShowImageModal = wrapper.find("[data-test='tvShowImageModal']");

    // click on tvShow image
    tvShowImageLinks?.forEach(async(tvShowImageLink) => {

      // click on tvShow image to open tvShow image modal
      await tvShowImageLink.trigger("click");

      // send mouse click event in document
      document.dispatchEvent(new MouseEvent("click"));

      // await DOM updates
      await nextTick();

      expect(tvShowImageModal.isVisible()).toBe(false);
    });
  });
});
