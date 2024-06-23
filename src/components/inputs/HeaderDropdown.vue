<template>
  <div
    ref="searchDropdownWrapper"
    class="relative mt-3 md:mt-0"
    @click="openSearchDropdown()"
  >
    <input
      ref="searchDropdownInput"
      v-model="search"
      type="text"
      class="bg-gray-800 light:bg-slate-200 text-sm rounded-full w-64 px-4 pl-8 py-1
      focus:outline-none focus:shadow-outline"
      placeholder="Search (Press '/' to focus)"
      tabindex="0"
      @focus="openSearchDropdown()"
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
        class="z-50 absolute bg-gray-800 light:bg-slate-200 text-sm rounded w-64 mt-4"
      >
        <ul
          v-if="searchResults.length > 0"
          @click.self="closeSearchDropdown()"
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
            >
              <img
                v-if="getImagePathFrom(result)"
                :src="`https://image.tmdb.org/t/p/w45/${getImagePathFrom(result)}`"
                alt="poster"
                class="w-8"
              >
              <img
                v-else
                src="https://via.placeholder.com/50x75"
                alt="poster"
                class="w-8"
              >
              <span class="ml-4">{{ getMediaNameFrom(result) }}</span>
            </RouterLink>
          </li>
        </ul>
        <div
          v-else
          class="px-3 py-3"
        >
          No results for "{{ search }}"
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

const search = ref<string>("");
const searchResults = ref<MultiSearchResponseResult[]>([]);

const searchDropdownInput = ref<HTMLInputElement | null>(null);
const searchDropdownWrapper = ref<HTMLElement | null>(null);

const isSearchDropdownOpen = ref<boolean>(false);
const isSearchDropdownLoading = ref<boolean>(false);

onMounted(() => {
  // create a shortcut to searchdropdown on press "/"
  useEventListener(document, "keydown", activateShortcutToSearchDropdown);
});

watchDebounced(
  search,
  () => searchMedia(),
  { debounce: 500, maxWait: 1000 }
);

// close search dropdown wrapper on click outside it
onClickOutside(searchDropdownWrapper, () => closeSearchDropdown());

async function searchMedia(): Promise<void> {
  if (search.value.trim().length >= 3) {
    isSearchDropdownLoading.value = true;

    const { data } = await useMultiSearch(search);
    console.log(data.value);
    searchResults.value = unref(data)?.results?.slice(0, 7) as MultiSearchResponseResult[];
    console.log(searchResults.value);

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

function activateShortcutToSearchDropdown(event: KeyboardEvent) {
  if (event.key === "/") {
    event.preventDefault();
    searchDropdownInput.value?.focus();
  }
}

function getImagePathFrom(result: MultiSearchResponseResult): string  {
  const mapMediaTypeToImagePath: Record<string, () => string> = {
    "movie": () => (result as MultiSearchMovieResponseResult)?.poster_path,
    "tv": () => (result as MultiSearchTvShowResponseResult)?.poster_path,
    "person": () => (result as MultiSearchActorResponseResult)?.profile_path,
  };

  return mapMediaTypeToImagePath[result.media_type]() ?? "";
}

function getMediaNameFrom(result: MultiSearchResponseResult): string  {
  const mapMediaTypeToMediaName: Record<string, () => string> = {
    "movie": () => (result as MultiSearchMovieResponseResult)?.title,
    "tv": () => (result as MultiSearchTvShowResponseResult)?.name,
    "person": () => (result as MultiSearchActorResponseResult)?.name,
  };

  return mapMediaTypeToMediaName[result.media_type]() ?? "";
}

function createMediaDetailsRouteFrom(result: MultiSearchResponseResult):
DetailsRoute  {
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
