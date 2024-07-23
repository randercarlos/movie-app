<template>
  <div
    data-test="SkeletonLoader"
    :class="[
      'relative overflow-hidden bg-gray-200 dark:bg-gray-800',
      props.shape === 'circle' ? 'rounded-full' : 'rounded-lg',
    ]"
  >
    <!-- eslint-disable-next-line max-len -->
    <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-700 opacity-50 animate-shimmer" />
  </div>
</template>

<script setup lang="ts">

// Props for the component
const props = defineProps({
  shape: {
    type: String,
    default: "rectangle", // 'rectangle' or 'circle'
    validator: (value: string) => ["rectangle", "circle"].includes(value)
  }
});
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.3s infinite;
}
</style>
