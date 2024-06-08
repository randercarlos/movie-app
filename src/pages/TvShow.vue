<template>
  <TvShowListItemDetails
    v-if="tvShowDetails"
    :tv-show-details="tvShowDetails"
  />
</template>

<script setup lang="ts">
import { ref, type MaybeRef } from "vue";
import TvShowListItemDetails from "@/components/tvShow/TvShowListItemDetails.vue";
import { useRoute } from "vue-router";
import type { TvShowDetails, TvShowDetailsResponse } from "@/typings/interfaces";
import { handleError } from "@/utils/handleError";
import { useTvShowDetails } from "@/composables/tv-show/useTvShowDetails";
import { useTvShowDetailsModelView } from "@/composables/tv-show/useTvShowDetailsModelView";

const route = useRoute();
const tvShowId = ref<number>(+route.params.tvShowId);
const tvShowDetails = ref<TvShowDetails>();

try {
  const { data: tvShowDetailsResponse } = await useTvShowDetails(tvShowId);
  const { data: tvShowDetailsModelView } = useTvShowDetailsModelView(
    tvShowDetailsResponse as MaybeRef<TvShowDetailsResponse>
  );
  tvShowDetails.value = tvShowDetailsModelView.value;
} catch(err: unknown) {
  handleError("Error on show movie.", err as Error);
}
</script>
