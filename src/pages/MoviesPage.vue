<template>
  <div class="container mx-auto px-4 pt-16">
    <div class="popular-movies">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">
        Popular Movies
      </h2>
      <MovieList :movies="popularMovies" />
    </div> <!-- end pouplar-movies -->

    <div class="now-playing-movies py-24">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">
        Now Playing
      </h2>
      <MovieList :movies="nowPlayingMovies" />
    </div> <!-- end now-playing-movies -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Movie } from "@/models/interfaces";
import MovieList from "@/components/Movie/MovieList.vue";

const popularMovies = ref<Array<Movie>>([]);
const nowPlayingMovies = ref<Array<Movie>>([]);
</script>

<style scoped>

</style>
