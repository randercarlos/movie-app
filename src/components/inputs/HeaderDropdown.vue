<template>
  <div
    id="searchDropdownWrapper"
    ref="searchDropdownWrapper"
    class="relative mt-3 md:mt-0"
  >
    <input
      id="searchDropdownInput"
      ref="searchDropdownInput"
      v-model="search"
      type="text"
      class="bg-gray-800 light:bg-slate-200 text-sm rounded-full w-64 px-4 pl-8 py-1
      focus:outline-none focus:shadow-outline"
      :placeholder="t('header.search.placeholder')"
      tabindex="0"
      @focus="openSearchDropdown()"
      @click="openSearchDropdown()"
      @keydown.esc="closeSearchDropdown()"
      @keydown.shift.tab.prevent="closeSearchDropdown()"
    >
    <div class="absolute top-0">
      <svg
        class="fill-current w-4 text-gray-500 light:text-gray-700 mt-2 ml-2"
        viewBox="0 0 24 24"
      >
        <path
          class="heroicon-ui"
          d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12
          6 6 0 000 12z"
        />
      </svg>
    </div>

    <div
      v-if="isSearchDropdownLoading"
      class="spinner top-0 right-0 mr-4 mt-3"
    />

    <Transition>
      <div
        v-show="isSearchDropdownOpen"
        id="searchDropdownResults"
        class="z-50 absolute bg-gray-800 light:bg-slate-200 text-sm rounded w-64 mt-4"
      >
        <ul
          v-if="searchResults.length > 0"
        >
          <li
            v-for="(result, index) in searchResults"
            :key="index"
            class="border-b border-gray-700 light:border-gray-300"
          >
            <RouterLink
              class="block hover:bg-gray-700 light:hover:bg-slate-300 px-3 py-3 flex items-center
              transition ease-in-out duration-150"
              :to="createMediaDetailsRouteFrom(result)"
              @keydown.tab="index === searchResults.length - 1 && closeSearchDropdown()"
              @click.prevent="closeSearchDropdown()"
            >
              <img
                v-if="getImagePathFrom(result)"
                :src="`https://image.tmdb.org/t/p/w45${getImagePathFrom(result)}`"
                alt="poster"
                class="w-8"
              >
              <img
                v-else
                src="https://placehold.co/50x75"
                alt="poster"
                class="w-8"
              >
              <span class="ml-4">{{ getMediaNameFrom(result) }}</span>
            </RouterLink>
          </li>
        </ul>
        <div
          v-else
          id="searchDropdownNoResults"
          class="px-3 py-3"
        >
          {{ $t('header.search.noResults') }} "{{ search }}"
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useMultiSearch } from "@/composables/multi-search/useMultiSearch";
import type {
  MultiSearchActorResponseResult,
  MultiSearchMovieResponseResult,
  MultiSearchTvShowResponseResult
} from "@/typings/interfaces";
import type { DetailsRoute, MultiSearchResponseResult } from "@/typings/types";
import { onClickOutside, useEventListener, watchDebounced } from "@vueuse/core";
import { onMounted, ref, unref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const search = ref<string>("");
const searchResults = ref<MultiSearchResponseResult[]>([]);

const searchDropdownInput = ref<HTMLInputElement | null>(null);
const searchDropdownWrapper = ref<HTMLElement | null>(null);

const isSearchDropdownOpen = ref<boolean>(false);
const isSearchDropdownLoading = ref<boolean>(false);

onMounted(() => {
  // listening all keypress events from document
  useEventListener(document, "keypress", activateShortcutToFocusOnSearchDropdown);
});

// close search dropdown wrapper on click outside it
onClickOutside(searchDropdownWrapper, () => closeSearchDropdown());

// watch changes in search variable and call searchMedia() with delay of 500ms
watchDebounced(
  search,
  () => searchMedia(),
  { debounce: 500, maxWait: 1000 }
);

async function searchMedia(): Promise<void> {
  // search is done with min of 3 letters/chars
  if (search.value.trim().length >= 3) {
    isSearchDropdownLoading.value = true;

    const { data } = await useMultiSearch(search);
    searchResults.value = unref(data)?.results?.slice(0, 7) as MultiSearchResponseResult[];

    isSearchDropdownLoading.value = false;
  } else {
    searchResults.value = [];
  }
}

function closeSearchDropdown(): void {
  if (isSearchDropdownOpen.value) {
    isSearchDropdownOpen.value = false;
  }
}

async function openSearchDropdown(): Promise<void> {
  if (! isSearchDropdownOpen.value) {
    isSearchDropdownOpen.value = true;
  }
}

// create a shortcut to searchdropdown on press "/"
function activateShortcutToFocusOnSearchDropdown(event: KeyboardEvent): void {
  if (event.key === "/") {
    event.preventDefault();
    searchDropdownInput.value?.focus();
  }
}

// get right image path from media
function getImagePathFrom(result: MultiSearchResponseResult): string | null {
  const mapMediaTypeToImagePath: Record<string, () => string | null> = {
    "movie": () => (result as MultiSearchMovieResponseResult)?.poster_path,
    "tv": () => (result as MultiSearchTvShowResponseResult)?.poster_path,
    "person": () => (result as MultiSearchActorResponseResult)?.profile_path,
  };

  return mapMediaTypeToImagePath[result.media_type]();
}

// get right name from media
function getMediaNameFrom(result: MultiSearchResponseResult): string  {
  const mapMediaTypeToMediaName: Record<string, () => string> = {
    "movie": () => (result as MultiSearchMovieResponseResult)?.title,
    "tv": () => (result as MultiSearchTvShowResponseResult)?.name,
    "person": () => (result as MultiSearchActorResponseResult)?.name,
  };

  return mapMediaTypeToMediaName[result.media_type]();
}

function createMediaDetailsRouteFrom(result: MultiSearchResponseResult): DetailsRoute {
  const mapMediaTypeToMediaDetailsRoute: Record<string, () => DetailsRoute> = {
    "movie": () => ({
      name: "movie",
      params: { movieId: result.id }
    }),
    "tv": () => ({
      name: "tvShow",
      params: { tvShowId: result.id }
    }),
    "person": () => ({
      name: "actor",
      params: { actorId: result.id }
    }),
  };

  return mapMediaTypeToMediaDetailsRoute[result.media_type]();
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
