<template>
  <footer class="border-t border-gray-800 light:border-gray-300">
    <div class="container mx-auto text-sm px-4 py-6 flex justify-between items-center">
      <span>
        {{ t('footer.poweredBy') }} <a
          href="https://www.themoviedb.org/documentation/api"
          class="underline hover:text-gray-300"
          target="_blank"
        >TMDb API</a>
      </span>
      <span>
        {{ t('footer.createdBy') }} <a
          href="https://www.linkedin.com/in/rander-carlos-308a63a8/"
          class="underline hover:text-gray-300"
          target="_blank"
        >Rander Carlos</a>
        👨‍💻
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
</script>
