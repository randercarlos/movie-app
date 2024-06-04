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
import { useMovieDetails } from "@/composables/useMovieDetails";
import type { MovieDetails, MovieDetailsResponse } from "@/typings/interfaces";
import { useMovieDetailsModelView } from "@/composables/useMovieDetailsModelView";
import { handleError } from "@/utils/handleError";
// import { resolvedPromises } from "@/utils/helper";

const route = useRoute();
const movieId = ref<number>(+route.params.movieId);
const movieDetails = ref<MovieDetails>();

//  await resolvedPromises(10000);
try {
  const { data: movieDetailsResponse } = await useMovieDetails(movieId);
  const { data: movieDetailsModelView } = useMovieDetailsModelView(
  movieDetailsResponse as MaybeRef<MovieDetailsResponse>,
  );
  movieDetails.value = movieDetailsModelView.value;
} catch(err: unknown) {
  handleError("Error on show movie.", err as Error);
}
</script>
