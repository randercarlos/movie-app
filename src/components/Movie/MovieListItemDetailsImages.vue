<template>
  <div class="movie-images">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-4xl font-semibold">
        Images
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="(image, index) in props.movieDetails?.images"
          :key="index"
          class="mt-8"
          data-test="movieImageCard"
        >
          <a
            href="#"
            @click.prevent="openMovieImageModalWithFile
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

      <!-- Begin Trailer Modal -->
      <div
        v-show="isMovieImageModalOpen"
        ref="movieImageModal"
        style="background-color: rgba(0, 0, 0, 0.9);"
        class="fixed left-0 top-0 h-full w-full flex items-center overflow-y-auto shadow-lg"
        data-test="movieImageModal"
        tabindex="0"
        @keydown.esc="closeMovieImageModal()"
      >
        <div class="container mx-auto lg:px-32 rounded-lg overflow-y-auto w-320">
          <div
            ref="movieImageModalWrapper"
            class="bg-gray-900 light:bg-slate-200 rounded"
          >
            <div class="flex justify-end pr-4 pt-2">
              <button
                id="movieImageModalCloseButton"
                class="text-3xl leading-none hover:text-gray-300"
                @click="closeMovieImageModal()"
              >
                &times;
              </button>
            </div>
            <div class="modal-body px-8 py-8">
              <img
                :src="movieImageModalImg"
                alt="poster"
                data-test="movieImageModalImg"
              >
            </div>
          </div>
        </div>
      </div>
      <!-- End Trailer Modal -->
    </div>
  </div> <!-- end movie-images -->
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import type { MovieDetailsProps } from "@/typings/props";
import { onClickOutside } from "@vueuse/core";

const props = defineProps<MovieDetailsProps>();
const movieImageModal = ref<HTMLInputElement | null>(null);
const movieImageModalWrapper = ref<HTMLInputElement | null>(null);

const movieImageModalImg = ref<string>();
const isMovieImageModalOpen = ref<boolean>(false);

// close movie image modal on click outside it
onClickOutside(movieImageModalWrapper, () => closeMovieImageModal());

function closeMovieImageModal(): void {
  if (isMovieImageModalOpen.value) {
    isMovieImageModalOpen.value = false;
  }
}

async function openMovieImageModal(): Promise<void> {
  if (! isMovieImageModalOpen.value) {
    isMovieImageModalOpen.value = true;
    await nextTick();
    movieImageModal.value?.focus();
  }
}

function openMovieImageModalWithFile(imageFilePath: string): void {
  movieImageModalImg.value = imageFilePath;
  openMovieImageModal();
}
</script>
