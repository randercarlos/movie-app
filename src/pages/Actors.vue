<template>
  <!-- start popular-actors -->
  <div class="container mx-auto px-4 pt-16">
    <div class="popular-actors">
      <h2 class="uppercase tracking-wider text-orange-500 text-2xl font-semibold">
        Popular Actors
      </h2>

      <ActorList
        v-if="popularActors.length > 0"
        :actors="popularActors"
      />

      <!-- start loading on scroll bottom -->
      <div class="my-8">
        <div class="flex justify-center">
          <div class="spinner my-8 text-4xl">
            &nbsp;
          </div>
        </div>
      </div>
    </div>
    <!-- end loading on scroll bottom -->
  </div>
  <!-- end popular-actors -->
</template>

<script setup lang="ts">
import ActorList from "@/components/actor/ActorList.vue";
import { ref, shallowRef, type MaybeRef } from "vue";
import { handleError } from "@/utils/handleError";
import type { Actor, ActorResponse } from "@/typings/interfaces";
import { usePopularActors } from "@/composables/actor/usePopularActors";
import { useActorsModelView } from "@/composables/actor/useActorsModelView";
import { useInfiniteScroll, useTimeoutFn } from "@vueuse/core";

const popularActors = shallowRef<Actor[]>([]);
const popularActorsPage = ref<number>(1); // 1 => initial page to load popular actors

async function onScrollBottom()  {
  popularActorsPage.value++;  // each scroll bottom, increase the page number to fetch more actors
  await loadActors();
}

try {
  await loadActors();

  useTimeoutFn(() => {
    useInfiniteScroll(
      document,
      async() => {
        onScrollBottom();
      },
      { distance: 70, direction: "bottom", interval: 2000 }
    );
  }, 200);


} catch(err: unknown) {
  handleError("Error on show actors.", err as Error);
}

async function loadActors() {
  const { data: popularActorsResponse } = await usePopularActors(popularActorsPage);
  const { data: popularActorsModelView } = useActorsModelView(
    popularActorsResponse as MaybeRef<ActorResponse>
  );
  // add/merge popular actors loaded by scroll bottom in previous loaded popular actors
  popularActors.value = [...popularActors.value, ...popularActorsModelView.value];
}
</script>
