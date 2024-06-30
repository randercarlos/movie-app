<template>
  <div class="actor-images">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-4xl font-semibold">
        {{ t("actor.images") }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        <div
          v-for="(image, index) in props.actorDetails?.images"
          :key="index"
          class="mt-8"
          data-test="actorImageCard"
        >
          <a
            href="#"
            @click.prevent="openActorImageModalWithFile
              (`https://image.tmdb.org/t/p/w400/${image?.file_path}`)"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w300/${image?.file_path}`"
              alt="images"
              class="transition duration-150 ease-in-out hover:opacity-75"
            >
          </a>
        </div>
      </div>

      <!-- Begin Trailer Modal -->
      <div
        v-show="isActorImageModalOpen"
        ref="actorImageModal"
        style="background-color: rgba(0, 0, 0, 0.9);"
        class="fixed left-0 top-0 h-full w-full flex items-center overflow-y-auto shadow-lg"
        data-test="actorImageModal"
        tabindex="0"
        @keydown.esc="closeActorImageModal()"
      >
        <div class="container mx-auto lg:px-32 rounded-lg overflow-y-auto h-auto w-auto">
          <div
            ref="actorImageModalWrapper"
            class="bg-gray-900 rounded"
          >
            <div class="flex justify-end pr-4 pt-2">
              <button
                id="actorImageModalCloseButton"
                class="text-3xl leading-none hover:text-gray-300"
                @click="closeActorImageModal()"
              >
                &times;
              </button>
            </div>
            <div class="modal-body px-8 py-8">
              <img
                :src="actorImageModalImg"
                alt="poster"
                data-test="actorImageModalImg"
                class="object-cover"
              >
            </div>
          </div>
        </div>
      </div>
      <!-- End Trailer Modal -->
    </div>
  </div> <!-- end actor-images -->
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import type { ActorDetailsProps } from "@/typings/props";
import { onClickOutside } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const props = defineProps<ActorDetailsProps>();
const actorImageModal = ref<HTMLInputElement | null>(null);
const actorImageModalWrapper = ref<HTMLInputElement | null>(null);

const actorImageModalImg = ref<string>();
const isActorImageModalOpen = ref<boolean>(false);

// close actor image modal on click outside it
onClickOutside(actorImageModalWrapper, () => closeActorImageModal());

function closeActorImageModal(): void {
  if (isActorImageModalOpen.value) {
    isActorImageModalOpen.value = false;
  }
}

async function openActorImageModal(): Promise<void> {
  if (! isActorImageModalOpen.value) {
    isActorImageModalOpen.value = true;
    await nextTick();
    actorImageModal.value?.focus();
  }
}

function openActorImageModalWithFile(imageFilePath: string): void {
  actorImageModalImg.value = imageFilePath;
  openActorImageModal();
}
</script>
