<template>
  <div class="tv-info border-b border-gray-800 light:border-gray-300">
    <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row">
      <div class="flex-none">
        <img
          :src="props.tvShowDetails?.poster_path ?? ''"
          alt="poster"
          class="md:w-90 lg:w-120"
        >
      </div>
      <div class="md:ml-8">
        <h2 class="text-4xl mt-4 md:mt-0 font-semibold">
          {{ props.tvShowDetails?.name }}
        </h2>
        <div class="flex flex-wrap items-center text-gray-400 text-sm">
          <svg
            class="fill-current text-orange-500 w-4"
            viewBox="0 0 24 24"
          ><g data-name="Layer 2"><path
            d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1
            0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0
            01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
            data-name="star"
          /></g></svg>
          <span class="ml-1">{{ props.tvShowDetails?.vote_average }}</span>
          <span class="mx-2">|</span>
          <span>{{ props.tvShowDetails?.first_air_date }}</span>
          <span class="mx-2">|</span>
          <span>{{ props.tvShowDetails?.genres }}</span>
        </div>

        <p class="text-gray-300 light:text-gray-500 mt-8">
          {{ props.tvShowDetails?.overview }}
        </p>

        <div class="mt-12">
          <h4 class="text-white light:text-gray-700 font-semibold">
            {{ t("tvShow.featuredCrew") }}
          </h4>
          <div class="flex mt-4">
            <div
              v-for="crew in props.tvShowDetails?.credits?.crew?.slice(0, 5)"
              :key="crew.name"
              class="mr-8"
            >
              <div>{{ crew.name }}</div>
              <div class="text-sm text-gray-400">
                {{ crew.job }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <template v-if="(props.tvShowDetails?.videos?.results ?? []).length > 0">
            <div
              class="mt-12"
            >
              <button
                id="tvShowTrailerButton"
                class="flex inline-flex items-center bg-orange-500 text-gray-900 rounded
              font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
                @click="openTvShowTrailerModal()"
              >
                <svg
                  class="w-6 fill-current"
                  viewBox="0 0 24 24"
                ><path
                  d="M0 0h24v24H0z"
                  fill="none"
                /><path
                  d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10
              10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59
              8 8-3.59 8-8 8z"
                /></svg>
                <span class="ml-2">{{ t("tvShow.playTrailer") }}</span>
              </button>
            </div>

            <!-- Begin Trailer Modal -->
            <template v-if="isTvShowTrailerModalOpen">
              <div
                id="tvShowTrailerModal"
                ref="tvShowTrailerModal"
                v-on-click-outside="closeTvShowTrailerModal"
                style="background-color: rgba(0, 0, 0, 0.9);"
                class="fixed top-0 left-0 w-full h-full flex items-center shadow-lg
                overflow-y-auto"
                tabindex="0"
                @keydown.esc="closeTvShowTrailerModal()"
              >
                <div
                  class="container mx-auto lg:px-32 rounded-lg overflow-y-auto w-320"
                >
                  <div
                    ref="tvShowTrailerModalWrapper"
                    class="bg-gray-900 light:bg-slate-200 rounded"
                  >
                    <div class="flex justify-end pr-4 pt-2">
                      <button
                        id="tvShowTrailerModalCloseButton"
                        class="text-3xl leading-none hover:text-gray-300"
                        @click="closeTvShowTrailerModal()"
                      >
                        &times;
                      </button>
                    </div>
                    <div class="modal-body px-8 py-8">
                      <div
                        class="responsive-container overflow-hidden relative"
                        style="padding-top: 56.25%"
                      >
                        <iframe
                          class="responsive-iframe absolute top-0 left-0 w-full h-full"
                          :src="`https://www.youtube.com/embed/${props.tvShowDetails?.videos
                            ?.results[0]?.key}`"
                          style="border:0;"
                          allow="autoplay; encrypted-media"
                          allowfullscreen
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <!-- End Trailer Modal -->
          </template>
        </div>
      </div>
    </div>
  </div> <!-- end tvShow-info -->
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import type { TvShowDetailsProps } from "@/typings/props";
import { onClickOutside } from "@vueuse/core";
import { vOnClickOutside } from "@vueuse/components";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const props = defineProps<TvShowDetailsProps>();
const tvShowTrailerModal = ref<HTMLInputElement | null>(null);
const tvShowTrailerModalWrapper = ref<HTMLInputElement | null>(null);

const isTvShowTrailerModalOpen = ref<boolean>(false);

// close movie trailer modal on click outside it
onClickOutside(tvShowTrailerModalWrapper, () => closeTvShowTrailerModal());

function closeTvShowTrailerModal(): void {
  if (isTvShowTrailerModalOpen.value) {
    isTvShowTrailerModalOpen.value = false;
  }
}

async function openTvShowTrailerModal(): Promise<void> {
  if (! isTvShowTrailerModalOpen.value) {
    isTvShowTrailerModalOpen.value = true;
    await nextTick();
    tvShowTrailerModal.value?.focus();
  }
}
</script>
