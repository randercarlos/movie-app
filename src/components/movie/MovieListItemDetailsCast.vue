<template>
  <!-- start movie-cast -->
  <div class="movie-cast border-b border-gray-800 light:border-gray-300">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-4xl font-semibold">
        {{ t("movie.cast") }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div
          v-for="cast in props.movieDetails?.cast"
          :key="cast.id"
          class="mt-8 cast-card"
        >
          <RouterLink
            :to="{ name: 'actor', params: { actorId: cast.id }}"
          >
            <img
              :src="cast.profile_path"
              alt="actor1"
              class="transition duration-150 ease-in-out hover:opacity-75"
            >
          </RouterLink>
          <div class="mt-2">
            <RouterLink
              :to="{ name: 'actor', params: { actorId: cast.id }}"
              class="mt-2 text-lg hover:text-gray:300"
            >
              {{ cast.name }}
            </RouterLink>
            <div class="text-sm text-gray-400">
              {{ cast.character }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> <!-- end movie-cast -->
</template>

<script setup lang="ts">
import type { MovieDetailsProps } from "@/typings/props";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
const props = defineProps<MovieDetailsProps>();
</script>
