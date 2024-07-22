import { describe, expect, it } from "vitest";
import { mount, } from "@vue/test-utils";
import ActorListItemDetailsImages from "@/components/actor/ActorListItemDetailsImages.vue";
import { nextTick } from "vue";
import { actorDetailsMock } from "#/mockData";

const actorDetails = { ...actorDetailsMock };
const wrapper = mount(ActorListItemDetailsImages, {
  attachTo: document.body,
  props: {
    actorDetails
  }
});

describe("ActorListItemDetailsImages.vue", () => {
  it("renders correctly", async() => {
    const actorDetailsImages = actorDetails.images;
    const actorImages = wrapper.findAll("[data-test='actorImageCard'] a img");

    expect(wrapper.findAll("[data-test='actorImageCard']").length)
      .toBe(actorDetailsImages?.length);

    actorDetailsImages?.forEach((actorDetailsImage, index) => {
      // check if there is a tag <img src=""/>  for each image in actorDetais.images
      expect(actorImages.at(index)?.attributes("src")).toBe(actorDetailsImage.imageUrl);
    });
  });

  it("show the actor image modal when actor image is clicked.", async() => {
    const actorDetailsImages = actorDetails.images;
    const actorImageLinks = wrapper.findAll("[data-test='actorImageCard'] a");
    const actorImageModal = wrapper.find("[data-test='actorImageModal']");

    expect(actorImageModal.isVisible()).toBe(false);

    actorImageLinks?.forEach(async(actorImageLink, index) => {
      // click on link to open actor image modal
      await actorImageLink.trigger("click");

      // test if actor image modal is visible(v-show)
      expect(wrapper.find("[data-test='actorImageModal']").isVisible())
        .toBe(true);

      // test if actor image modal is visible with right image
      expect(wrapper.find("[data-test='actorImageModalImg']").attributes("src"))
        .toBe(actorDetailsImages.at(index)?.imageUrl);
    });
  });

  it("hide the actor image modal when the close image button is clicked.", async() => {
    const actorImageLinks = wrapper.findAll("[data-test='actorImageCard'] a");
    const actorImageModal = wrapper.find("[data-test='actorImageModal']");

    actorImageLinks?.forEach(async(actorImageLink) => {
      // click on actor image
      await actorImageLink.trigger("click");

      // click on actor image close button
      await wrapper.find("#actorImageModalCloseButton").trigger("click");

      expect(actorImageModal.isVisible()).toBe(false);
    });
  });

  it("hide the actor image modal when the escape button is clicked.", async() => {
    const actorImageLinks = wrapper.findAll("[data-test='actorImageCard'] a");
    const actorImageModal = wrapper.find("[data-test='actorImageModal']");

    actorImageLinks?.forEach(async(actorImageLink) => {
      // click on actor image to open actor image modal
      await actorImageLink.trigger("click");

      // click on escape button after actor image modal is open
      await actorImageModal.trigger("keydown.esc");

      expect(actorImageModal.isVisible()).toBe(false);
    });
  });

  it("hide the actor image modal when clicked outside it.", async() => {
    const actorImageLinks = wrapper.findAll("[data-test='actorImageCard'] a");
    const actorImageModal = wrapper.find("[data-test='actorImageModal']");

    // click on actor image
    actorImageLinks?.forEach(async(actorImageLink) => {
      // click on actor image to open actor image modal
      await actorImageLink.trigger("click");

      // send mouse click event in document
      document.dispatchEvent(new MouseEvent("click"));

      // await DOM updates
      await nextTick();

      expect(actorImageModal.isVisible()).toBe(false);
    });
  });
});
