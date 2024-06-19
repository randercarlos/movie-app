<template>
  <div
    class="grid grid-cols-1 gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2"
  >
    <ActorListItem
      v-for="actor in props.actors"
      :key="actor.id"
      :actor="actor"
    />
  </div>
</template>

<script setup lang="ts">
import ActorListItem from "@/components/actor/ActorListItem.vue";
import type { ActorsListProps } from "@/typings/props";

const props = defineProps<ActorsListProps>();
</script>
