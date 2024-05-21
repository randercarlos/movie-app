<template>
  <div class="mt-8">
    <RouterLink :to="{ name: 'movie', params: { movieId: props.movie?.id} }">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${props.movie?.poster_path}`"
        alt="poster"
        class="transition duration-150 ease-in-out hover:opacity-75"
      >
    </RouterLink>
    <div class="mt-2">
      <RouterLink
        :to="{ name: 'movie', params: { movieId: props.movie?.id} }"
        class="mt-2 text-lg hover:text-gray-300"
      >
        {{ props.movie?.title }}
      </RouterLink>
      <div class="mt-1 flex items-center text-sm text-gray-400">
        <svg
          class="w-4 fill-current text-orange-500"
          viewBox="0 0 24 24"
        ><g data-name="Layer 2"><path
          d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0
          01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68
          1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
          data-name="star"
        /></g></svg>
        <span class="ml-1">{{ props.movie?.vote_average }}</span>
        <span class="mx-2">|</span>
        <span>{{ props.movie?.release_date }}</span>
      </div>
      <div class="text-sm text-gray-400">
        {{ props.movie?.genres }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MoviesListItemProps } from "@/typings/props";

const props = defineProps<MoviesListItemProps>();
</script>
