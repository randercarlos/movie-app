<template>
  <div class="actor mt-8">
    <RouterLink :to="{ name: 'actor', params: { actorId: props.actor?.id} }">
      <img
        :src="props.actor?.profile_path"
        alt="profile image"
        class="hover:opacity-75 transition ease-in-out duration-150"
        rel="preload"
        as="image"
      >
    </RouterLink>
    <div class="mt-2">
      <RouterLink
        :to="{ name: 'actor', params: { actorId: props.actor?.id} }"
        class="text-lg hover:text-gray-300"
      >
        {{ props.actor?.name }}
      </RouterLink>
      <div
        id="known_for"
        class="text-sm truncate text-gray-400"
        :title="props.actor?.known_for"
      >
        {{ truncateString(props.actor?.known_for as string, 35) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActorsListItemProps } from "@/typings/props";
import { truncateString } from "@/utils/helper";

const props = defineProps<ActorsListItemProps>();
</script>
