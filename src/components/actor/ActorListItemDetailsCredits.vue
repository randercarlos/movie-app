<template>
  <!-- start credits-->
  <div class="credits border-b border-gray-800">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-4xl font-semibold">
        Credits
      </h2>

      <ul class="list-disc leading-loose pl-5 mt-8">
        <li
          v-for="credit in props.actorDetails?.credits"
          :key="credit.title"
        >
          {{ credit.release_year }} &middot;
          <strong>
            <RouterLink
              :to="credit.linkToPage"
              class="hover:underline"
            >{{ credit.title }}
            </RouterLink>
          </strong>
          as {{ credit.character }}
        </li>
      </ul>
    </div>
  </div>
  <!-- end credits-->
</template>

<script setup lang="ts">
import type { ActorDetailsProps } from "@/typings/props";

const props = defineProps<ActorDetailsProps>();
</script>
