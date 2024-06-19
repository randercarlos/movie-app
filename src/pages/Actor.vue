<template>
  <ActorListItemDetails
    v-if="actorDetails"
    :actor-details="actorDetails"
  />
</template>

<script setup lang="ts">
import { ref, type MaybeRef } from "vue";
import ActorListItemDetails from "@/components/actor/ActorListItemDetails.vue";
import { useRoute } from "vue-router";
import { useActorDetails } from "@/composables/actor/useActorDetails";
import type { ActorDetails, ActorDetailsResponse } from "@/typings/interfaces";
import { useActorDetailsModelView } from "@/composables/actor/useActorDetailsModelView";
import { handleError } from "@/utils/handleError";

const route = useRoute();
const actorId = ref<number>(+route.params.actorId);
const actorDetails = ref<ActorDetails>();

try {
  const { data: actorDetailsResponse } = await useActorDetails(actorId);
  const { data: actorDetailsModelView } = useActorDetailsModelView(
    actorDetailsResponse as MaybeRef<ActorDetailsResponse>
  );
  actorDetails.value = actorDetailsModelView.value;
} catch(err: unknown) {
  handleError("Error on show actor.", err as Error);
}
</script>
