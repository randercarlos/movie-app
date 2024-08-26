<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
    <MovieListItem
      v-for="movie in props.movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script setup lang="ts">
import MovieListItem from "@/components/movie/MovieListItem.vue";
import type { MoviesListProps } from "@/typings/props";

const props = defineProps<MoviesListProps>();
</script>
