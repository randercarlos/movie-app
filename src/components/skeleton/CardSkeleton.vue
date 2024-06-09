<template>
  <div class="mt-8">
    <SkeletonLoader class="w-full h-[412px]" />
    <div class="mt-2">
      <SkeletonLoader class="w-full h-6" />
      <div class="mt-1 flex items-center text-sm text-gray-400">
        <SkeletonLoader class="w-full h-9 mt-1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SkeletonLoader from "@/components/skeleton/SkeletonLoader.vue";
</script>
