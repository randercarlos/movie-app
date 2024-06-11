<template>
  <TvShowListItemDetailsInfo :tv-show-details="props.tvShowDetails" />
  <TvShowListItemDetailsCast :tv-show-details="props.tvShowDetails" />
  <TvShowListItemDetailsImages :tv-show-details="props.tvShowDetails" />
</template>

<script setup lang="ts">
import type { TvShowDetailsProps } from "@/typings/props";
import TvShowListItemDetailsInfo from "@/components/tv-show/TvShowListItemDetailsInfo.vue";
import TvShowListItemDetailsCast from "@/components/tv-show/TvShowListItemDetailsCast.vue";
import TvShowListItemDetailsImages from "@/components/tv-show/TvShowListItemDetailsImages.vue";

const props = defineProps<TvShowDetailsProps>();
</script>
