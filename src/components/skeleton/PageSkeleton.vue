<template>
  <div class="container mx-auto px-4 pt-16">
    <div class="above-cards">
      <SkeletonLoader class="w-50 h-8" />
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        <CardSkeleton
          v-for="n in 15"
          :key="n"
        />
      </div>
    </div>

    <div class="below-cards py-24">
      <SkeletonLoader class="w-50 h-8" />
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        <CardSkeleton
          v-for="n in 15"
          :key="n"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardSkeleton from "@/components/skeleton/CardSkeleton.vue";
</script>
