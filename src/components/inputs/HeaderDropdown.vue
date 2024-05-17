<template>
  <div
    class="relative mt-3 md:mt-0"
    @click="isOpen = false"
  >
    <input
      wire:model.debounce.500ms="search"
      type="text"
      class="bg-gray-800 text-sm rounded-full w-64 px-4 pl-8 py-1 focus:outline-none focus:shadow-outline"
      placeholder="Search (Press '/' to focus)"
      x-ref="search"
      @focus="isOpen = true"
      @keydown.escape="isOpen = false"
      @keydown.shift.tab="isOpen = false"
    >
    <div class="absolute top-0">
      <svg
        class="fill-current w-4 text-gray-500 mt-2 ml-2"
        viewBox="0 0 24 24"
      ><path
        class="heroicon-ui"
        d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z"
      /></svg>
    </div>

    <div
      wire:loading
      class="spinner top-0 right-0 mr-4 mt-3"
    />

    <div
      v-if="search.length > 2"
      class="z-50 absolute bg-gray-800 text-sm rounded w-64 mt-4"
      x-show.transition.opacity="isOpen"
    >
      <ul v-if="searchResults.length > 0">
        <li
          v-for="(result, index) in searchResults"
          :key="result"
          class="border-b border-gray-700"
        >
          <a
            href=""
            class="block hover:bg-gray-700 px-3 py-3 flex items-center transition ease-in-out duration-150"
            @keydown.tab="index === searchResults.length - 1 ? isOpen = false : isOpen = true"
          >
            <img
              v-if="false"
              src="https://image.tmdb.org/t/p/w92/${result.poster_path}"
              alt="poster"
              class="w-8"
            >
            <img
              v-else
              src="https://via.placeholder.com/50x75"
              alt="poster"
              class="w-8"
            >
            <span class="ml-4">{{ 'awesome movie' }}</span>
          </a>
        </li>
      </ul>
      <div
        v-else
        class="px-3 py-3"
      >
        No results for "{{ search }}"
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";


const isOpen = ref<boolean>(false);
const search = ref<string>("");
const searchResults = ref<Array<string>>([]);
</script>
