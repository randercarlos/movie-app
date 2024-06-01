<template>
  <MovieListItemDetails :movie-details="movieDetails" />
</template>

<script setup lang="ts">
import { ref, type MaybeRef } from "vue";
import MovieListItemDetails from "@/components/movie/MovieListItemDetails.vue";
import { useRoute } from "vue-router";
import { useMovieDetails } from "@/composables/useMovieDetails";
import type { MovieDetails, MovieDetailsResponse } from "@/typings/interfaces";
import { useMovieDetailsModelView } from "@/composables/useMovieDetailsModelView";

const route = useRoute();
const movieId = ref<number>(+route.params.movieId);
const movieDetails = ref<MovieDetails>();

const { data: movieDetailsResponse } = await useMovieDetails(movieId);
const { data: movieDetailsModelView } = useMovieDetailsModelView(
  movieDetailsResponse as MaybeRef<MovieDetailsResponse>,
);
movieDetails.value = movieDetailsModelView.value;
</script>
