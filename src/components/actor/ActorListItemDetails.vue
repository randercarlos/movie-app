<template>
  <ActorListItemDetailsInfo :actor-details="props.actorDetails" />
  <ActorListItemDetailsImages :actor-details="props.actorDetails" />
  <ActorListItemDetailsCredits :actor-details="props.actorDetails" />
</template>

<script setup lang="ts">
import type { ActorDetailsProps } from "@/typings/props";
import ActorListItemDetailsInfo from "@/components/actor/ActorListItemDetailsInfo.vue";
import ActorListItemDetailsImages from "@/components/actor/ActorListItemDetailsImages.vue";
import ActorListItemDetailsCredits from "@/components/actor/ActorListItemDetailsCredits.vue";

const props = defineProps<ActorDetailsProps>();
</script>
