<template>
  <MovieListItemDetailsInfo :movie-details="props.movieDetails" />
  <MovieListItemDetailsCast :movie-details="props.movieDetails" />
  <MovieListItemDetailsImages :movie-details="props.movieDetails" />
</template>

<script setup lang="ts">
import type { MovieDetailsProps } from "@/typings/props";
import MovieListItemDetailsInfo from "@/components/movie/MovieListItemDetailsInfo.vue";
import MovieListItemDetailsCast from "@/components/movie/MovieListItemDetailsCast.vue";
import MovieListItemDetailsImages from "@/components/movie/MovieListItemDetailsImages.vue";

const props = defineProps<MovieDetailsProps>();
</script>
