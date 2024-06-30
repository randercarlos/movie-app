<template>
  <div class="md:mr-4 mt-3 md:mt-0 text-2xl flex flex-col md:flex-row items-center">
    <!-- Sun in light mode, Moon in dark mode, from Carbon -->
    <button
      class="dark:i-carbon-sun i-carbon-moon"
      :title="isDark ? t('header.theme.lightMode') : t('header.theme.darkMode')"
      @click="toggleDark()"
    />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
const isDark = useDark({
  selector: "html", //element to add attribute to
  attribute: "class", // attribute name
  valueDark: "dark", // attribute value for dark mode
  valueLight: "light", // attribute value for light mode
});
const toggleDark = useToggle(isDark);
</script>
