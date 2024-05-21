<template>
  <MovieListItemDetails :movie-details="movieDetails" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import MovieListItemDetails from "@/components/movie/MovieListItemDetails.vue";
import { useRoute } from "vue-router";
import { useApiService } from "@/composables/useApiService";
import type { MovieDetails, MovieDetailsResponse } from "@/typings/interfaces";
import collect from "collect.js";
import moment from "moment";
import CONFIG from "@/config";

const route = useRoute();
const movieId = ref<number>(+route.params.movieId);

const movieDetails = ref<MovieDetails>();
const movieDetailEndpoint = ref<string>("movie");

async function getMovieDetails(): Promise<void> {
  const apiService = reactive(useApiService(movieDetailEndpoint));
  const params = ref<Record<string, string>>({
    "append_to_response": "credits,videos,images"
  });
  const { data } = await apiService.find<MovieDetailsResponse>(movieId, params);

  movieDetails.value = mountMovieModelView(data.value as MovieDetailsResponse);
}

function mountMovieModelView(movie: MovieDetailsResponse): MovieDetails {
  return collect(movie)
    .merge({
      "poster_path": movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : "https://via.placeholder.com/500x750",
      "vote_average": `${movie.vote_average * 10}%`,
      "release_date": moment(movie.release_date).format("MMM DD, YYYY"),
      "genres": collect(movie.genres).pluck("name").flatten().implode(", "),
      "crew": collect(movie.credits?.crew).take(CONFIG.MOVIE_CREW_QTY).all(),
      "cast": collect(movie.credits?.cast).take(CONFIG.MOVIE_CAST_QTY).map(function(cast) {
        return collect(cast).merge({
          "profile_path": cast.profile_path
            ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
            : "https://via.placeholder.com/300x450",
        }).all();
      }).all(),
      "images": collect(movie.images?.backdrops)?.take(CONFIG.MOVIE_IMAGES_QTY).all(),
    })
    .only(["poster_path", "id", "genres", "title", "vote_average", "overview", "release_date",
      "credits", "videos", "images", "crew", "cast", "images"])
    .all() as unknown as MovieDetails;
}

onMounted(async() => {
  await getMovieDetails();
});
</script>
