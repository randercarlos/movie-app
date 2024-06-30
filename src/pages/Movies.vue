<template>
  <div class="container mx-auto px-4 pt-16">
    <div class="popular-movies">
      <h2 class="uppercase tracking-wider text-orange-500 text-2xl font-semibold">
        {{ t('movies.popularMovies') }}
      </h2>
      <MovieList
        v-if="popularMovies.length > 0"
        :movies="popularMovies"
      />
    </div>

    <div class="now-playing-movies py-24">
      <h2 class="uppercase tracking-wider text-orange-500 text-2xl font-semibold">
        {{ t('movies.nowPlaying') }}
      </h2>
      <MovieList
        v-if="nowPlayingMovies.length > 0"
        :movies="nowPlayingMovies"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMovieGenres } from "@/composables/movie/useMovieGenres";
import MovieList from "@/components/movie/MovieList.vue";
import { useMoviesModelView } from "@/composables/movie/useMoviesModelView";
import { useNowPlayingMovies } from "@/composables/movie/useNowPlayingMovies";
import { usePopularMovies } from "@/composables/movie/usePopularMovies";
import type { Movie, MovieGenresResponse, MovieResponse } from "@/typings/interfaces";
import { shallowRef, type MaybeRef } from "vue";
import { handleError } from "@/utils/handleError";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const popularMovies = shallowRef<Movie[]>([]);
const nowPlayingMovies = shallowRef<Movie[]>([]);

try {
  const { data: moviesGenresResponse } = await useMovieGenres();
  const { data: popularMoviesResponse } = await usePopularMovies();
  const { data: nowPlayingMoviesResponse } =
    await useNowPlayingMovies();

  const { data: popularMoviesModelView } = useMoviesModelView(
    popularMoviesResponse as MaybeRef<MovieResponse>,
    moviesGenresResponse as MaybeRef<MovieGenresResponse>
  );
  popularMovies.value = popularMoviesModelView.value;

  const { data: nowPlayingMoviesModelView } = useMoviesModelView(
      nowPlayingMoviesResponse as MaybeRef<MovieResponse>,
      moviesGenresResponse as MaybeRef<MovieGenresResponse>
  );
  nowPlayingMovies.value = nowPlayingMoviesModelView.value;
} catch(err: unknown) {
  handleError("Error on show movies.", err as Error);
}
</script>
