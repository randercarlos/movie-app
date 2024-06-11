<template>
  <!-- start tv-show-images -->
  <div class="tv-images">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-4xl font-semibold">
        Images
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="(image, index) in props.tvShowDetails?.images"
          :key="index"
          class="mt-8"
          data-test="tvShowImageCard"
        >
          <a
            href="#"
            @click.prevent="openTvShowImageModalWithFile
              (`https://image.tmdb.org/t/p/original/${image?.file_path}`)"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500/${image?.file_path}`"
              alt="images"
              class="transition duration-150 ease-in-out hover:opacity-75"
            >
          </a>
        </div>
      </div>

      <!-- Begin Image Modal -->
      <div
        v-show="isTvShowImageModalOpen"
        ref="tvShowImageModal"
        style="background-color: rgba(0, 0, 0, 0.9);"
        class="fixed left-0 top-0 h-full w-full flex items-center overflow-y-auto shadow-lg"
        data-test="tvShowImageModal"
        tabindex="0"
        @keydown.esc="closeTvShowImageModal()"
      >
        <div class="container mx-auto lg:px-32 rounded-lg overflow-y-auto w-320">
          <div
            ref="tvShowImageModalWrapper"
            class="bg-gray-900 rounded"
          >
            <div class="flex justify-end pr-4 pt-2">
              <button
                id="tvShowImageModalCloseButton"
                class="text-3xl leading-none hover:text-gray-300"
                @click="closeTvShowImageModal()"
              >
                &times;
              </button>
            </div>
            <div class="modal-body px-8 py-8">
              <img
                :src="tvShowImageModalImg"
                alt="poster"
                data-test="tvShowImageModalImg"
              >
            </div>
          </div>
        </div>
      </div>
      <!-- End Image Modal -->
    </div>
  </div>
  <!-- end tv-show-images -->
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import type { TvShowDetailsProps } from "@/typings/props";
import { onClickOutside } from "@vueuse/core";

const props = defineProps<TvShowDetailsProps>();
const tvShowImageModal = ref<HTMLInputElement | null>(null);
const tvShowImageModalWrapper = ref<HTMLInputElement | null>(null);

const tvShowImageModalImg = ref<string>();
const isTvShowImageModalOpen = ref<boolean>(false);

// close tvShow image modal on click outside it
onClickOutside(tvShowImageModalWrapper, () => closeTvShowImageModal());

function closeTvShowImageModal(): void {
  if (isTvShowImageModalOpen.value) {
    isTvShowImageModalOpen.value = false;
  }
}

async function openTvShowImageModal(): Promise<void> {
  if (! isTvShowImageModalOpen.value) {
    isTvShowImageModalOpen.value = true;
    await nextTick();
    tvShowImageModal.value?.focus();
  }
}

function openTvShowImageModalWithFile(imageFilePath: string): void {
  tvShowImageModalImg.value = imageFilePath;
  openTvShowImageModal();
}
</script>
