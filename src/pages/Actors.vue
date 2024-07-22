<template>
  <!-- start popular-actors -->
  <div class="container mx-auto px-4 pt-16">
    <div class="popular-actors">
      <h2 class="uppercase tracking-wider text-orange-500 text-2xl font-semibold">
        {{ t("actors.popularActors") }}
      </h2>

      <ActorList
        v-if="popularActors.length > 0"
        :actors="popularActors"
      />

      <!-- start loading spinner -->
      <div
        v-if="isLoadingPopularActors"
        class="my-8 spinner-wrapper"
      >
        <div class="flex justify-center">
          <div class="spinner my-8 text-[10rem]">
            &nbsp;
          </div>
        </div>
      </div>
    </div>
    <!-- end loading spinner -->
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
import { useScroll, watchDebounced } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const popularActors = shallowRef<Actor[]>([]);
const popularActorsPage = ref<number>(1); // 1 => initial page to load popular actors
const isLoadingPopularActors = ref<boolean>(true);

await loadActors();

const { arrivedState } = useScroll(document, {
  offset: { bottom: 300 },
});

// watch with delay when value change
watchDebounced(arrivedState, () => {
  if (arrivedState.bottom) {  // is arrive in scroll bottom with offset of 300px ?
    onScrollBottom();
  }
},
{ debounce: 200, maxWait: 2000 });  // delay 200ms with max wait 2000ms

async function onScrollBottom()  {
  console.log("DENTRO DO onScrollBottom");
  isLoadingPopularActors.value = true;
  popularActorsPage.value++;  // each scroll bottom, increase the page number to fetch more actors
  await loadActors();
  isLoadingPopularActors.value = false;
}

async function loadActors() {
  try {
    console.log("DENTRO DO loadActors");
    const { data: popularActorsResponse } = await usePopularActors(popularActorsPage);
    const { data: popularActorsModelView } = useActorsModelView(
    popularActorsResponse as MaybeRef<ActorResponse>
    );
    // adds/merges popular actors loaded by scroll bottom with already loaded popular actors
    popularActors.value = [...popularActors.value, ...popularActorsModelView.value];
  } catch(err: unknown) {
    console.log("OCORREU UM ERRO");
    handleError("Error on show actors.", err as Error);
  }
}
</script>
