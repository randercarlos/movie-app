<template>
  <MovieListItemDetails
    v-if="movieDetails"
    :movie-details="movieDetails"
  />
</template>

<script setup lang="ts">
import { ref, type MaybeRef } from "vue";
import MovieListItemDetails from "@/components/movie/MovieListItemDetails.vue";
import { useRoute } from "vue-router";
import { useMovieDetails } from "@/composables/movie/useMovieDetails";
import type { MovieDetails, MovieDetailsResponse } from "@/typings/interfaces";
import { useMovieDetailsModelView } from "@/composables/movie/useMovieDetailsModelView";
import { handleError } from "@/utils/handleError";

const route = useRoute();
const movieId = ref<number>(+route.params.movieId);
const movieDetails = ref<MovieDetails>();

try {
  const { data: movieDetailsResponse } = await useMovieDetails(movieId);
  const { data: movieDetailsModelView } = useMovieDetailsModelView(
    movieDetailsResponse as MaybeRef<MovieDetailsResponse>
  );
  movieDetails.value = movieDetailsModelView.value;
} catch(err: unknown) {
  handleError("Error on show movie.", err as Error);
}
</script>
