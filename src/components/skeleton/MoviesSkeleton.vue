<template>
  <div class="container mx-auto px-4 pt-16">
    <div class="popular-movies">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">
        Popular Movies
      </h2>
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        <MoviesCardSkeleton
          v-for="n in 15"
          :key="n"
        />
      </div>
    </div>

    <div class="now-playing-movies py-24">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">
        Now Playing
      </h2>
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        <MoviesCardSkeleton
          v-for="n in 15"
          :key="n"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MoviesCardSkeleton from "./MoviesCardSkeleton.vue";
</script>
