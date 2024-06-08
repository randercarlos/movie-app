<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
    <TvShowListItem
      v-for="tvShow in props.tvShows"
      :key="tvShow.id"
      :tv-show="tvShow"
    />
  </div>
</template>

<script setup lang="ts">
import TvShowListItem from "@/components/tvShow/TvShowListItem.vue";
import type { TvShowsListProps } from "@/typings/props";

const props = defineProps<TvShowsListProps>();
</script>
