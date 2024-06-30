<template>
  <!-- start credits-->
  <div class="credits">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-4xl font-semibold">
        {{ t("actor.credits") }}
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
          {{ t("actor.as") }} {{ credit.character }}
        </li>
      </ul>
    </div>
  </div>
  <!-- end credits-->
</template>

<script setup lang="ts">
import type { ActorDetailsProps } from "@/typings/props";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const props = defineProps<ActorDetailsProps>();
</script>
