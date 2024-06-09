<template>
  <!-- start card-info -->
  <div class="card-info border-b border-gray-800">
    <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row">
      <div class="flex-none">
        <SkeletonLoader class="w-64 lg:w-96 h-[576px]" />
      </div>
      <div class="md:ml-24">
        <h2 class="text-4xl mt-4 md:mt-0 font-semibold mb-2">
          <SkeletonLoader class="w-150 h-8" />
        </h2>
        <div class="flex flex-wrap items-center text-gray-400 text-sm">
          <SkeletonLoader class="w-100 h-4" />
        </div>

        <p class="text-gray-300 mt-8">
          <SkeletonLoader class="w-250 h-16" />
        </p>

        <div class="mt-12">
          <h4 class="text-white font-semibold">
            <SkeletonLoader class="w-40 h-4" />
          </h4>
          <div class="flex mt-4">
            <div
              v-for="n in 3"
              :key="n"
              class="mr-8"
            >
              <div class="mb-2">
                <SkeletonLoader class="w-25 h-5" />
              </div>
              <div class="text-sm text-gray-400">
                <SkeletonLoader class="w-18 h-3" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            class="mt-12"
          >
            <SkeletonLoader class="w-[151px] h-[56px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end card-info -->

  <!-- start card-cast -->
  <div class="card-cast border-b border-gray-800">
    <div class="container mx-auto px-4 py-16">
      <SkeletonLoader class="w-40 h-8" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div
          v-for="n in 5"
          :key="n"
          class="mt-8 cast-card"
        >
          <SkeletonLoader class="w-[275px] h-[412px]" />
          <div class="mt-2">
            <SkeletonLoader class="w-50 h-6 mb-2" />
            <SkeletonLoader class="w-30 h-4" />
          </div>
        </div>
      </div>
    </div>
  </div> <!-- end card-cast -->

  <!-- start card-images -->
  <div class="card-images">
    <div class="container mx-auto px-4 py-16">
      <SkeletonLoader class="w-40 h-8" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="n in 9"
          :key="n"
          class="mt-8"
        >
          <SkeletonLoader class="w-[480px] h-[270px]" />
        </div>
      </div>
    </div>
  </div> <!-- end card-images -->
</template>

<script setup lang="ts">
import SkeletonLoader from "@/components/skeleton/SkeletonLoader.vue";
</script>
