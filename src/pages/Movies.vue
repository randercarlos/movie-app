<template>
  <div class="container mx-auto px-4 pt-16">
    <div class="popular-movies">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">
        Popular Movies
      </h2>
      <MovieList :movies="popularMovies" />
    </div>

    <div class="now-playing-movies py-24">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">
        Now Playing
      </h2>
      <MovieList :movies="nowPlayingMovies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, shallowRef } from "vue";
import type {
  Movie,
  MovieGenre,
  MovieGenreResponse,
  MovieResponse,
  MovieResponseResult
} from "@/typings/interfaces";
import MovieList from "@/components/movie/MovieList.vue";
import { useApiService } from "@/composables/useApiService";
import collect from "collect.js";
import { formatDate, formatNumber } from "@/utils/helper";

const moviesGenres = shallowRef<Array<MovieGenre>>([]);
const popularMovies = shallowRef<Array<Movie>>([]);
const nowPlayingMovies = shallowRef<Array<Movie>>([]);

const moviesGenresEndpoint = ref<string>("genre/movie/list");
const popularMoviesEndpoint = ref<string>("movie/popular");
const nowPlayingMoviesEndpoint = ref<string>("movie/now_playing");

async function getPopularMovies(): Promise<MovieResponse> {
  const apiService = reactive(useApiService(popularMoviesEndpoint));
  const { data } = await apiService.list<MovieResponse>();

  return data.value as MovieResponse;
}

async function getNowPlayingMovies(): Promise<MovieResponse> {
  const apiService = reactive(useApiService(nowPlayingMoviesEndpoint));
  const { data } = await apiService.list<MovieResponse>();

  return data.value as MovieResponse;
}

async function getMoviesGenres(): Promise<MovieGenre[]> {
  const apiService = reactive(useApiService(moviesGenresEndpoint));
  const { data } = await apiService.list<MovieGenreResponse>();

  return (data.value as MovieGenreResponse).genres;
}

function mountMoviesModelView(movieResponse: MovieResponse): Movie[] {
  return collect(movieResponse.results)
    .map(function(movieResponseResult: MovieResponseResult) {
      const genresFormatted = collect(movieResponseResult.genre_ids)
        .mapWithKeys((genreId: number) => [genreId, getGenreNameById(genreId)])
        .values()
        .implode(", ");

      return collect(movieResponseResult)
        .merge({
          "poster_path":  `https://image.tmdb.org/t/p/w500/${movieResponseResult.poster_path}`,
          "vote_average": `${formatNumber(movieResponseResult.vote_average * 10, 0, 2)}%`,
          "release_date": formatDate(movieResponseResult.release_date, "MMM DD, YYYY"),
          "genres": genresFormatted,
        })
        .only([
          "poster_path", "id", "genre_ids", "title", "vote_average", "overview", "release_date",
          "genres",
        ])
        .all() as unknown as Movie;
    }).all() as unknown as Movie[];
}

function getGenreNameById(genreId: number): string {
  return collect(moviesGenres.value)
    .mapWithKeys((genre: MovieGenre) => [genre.id, genre.name])
    .get(genreId) as unknown as string;
}

onMounted(async() => {
  moviesGenres.value = await getMoviesGenres();
  popularMovies.value = mountMoviesModelView(await getPopularMovies());
  nowPlayingMovies.value = mountMoviesModelView(await getNowPlayingMovies());
});
</script>

<style scoped>

</style>
