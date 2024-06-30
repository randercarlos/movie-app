<template>
  <div
    class="md:mr-4 mt-3 md:mt-0 text-2xl flex flex-col md:flex-row items-center"
  >
    <button
      class="bg-transparent focus:outline-transparent focus:border-0"
      @click="toggleLanguage()"
    >
      <img
        :src="i18nOptions.flag"
        :title="i18nOptions.changeTo"
      >
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";

import moment from "moment";
import "moment/dist/locale/pt-br";
import { I18nLanguages } from "@/typings/enums";

const { locale: appGlobalLocale } = useI18n({ useScope: "global" });
const i18nOptions = computed(() => {
  return {
    flag: appGlobalLocale.value === I18nLanguages.enUS
      ? "/img/brazil-flag.svg"
      : "/img/usa-flag.svg",
    changeTo: appGlobalLocale.value === I18nLanguages.enUS
      ? "Mudar idioma para Português"
      : "Change idiom to English",
  };
});

onMounted(() => {
  appGlobalLocale.value = sessionStorage.getItem("currentAppGlobalLocale") ?? I18nLanguages.enUS;
});

watch(appGlobalLocale, (newLocale) => {
  moment.locale(newLocale.toLowerCase());
});

function toggleLanguage() {
  let newLocale = appGlobalLocale.value === I18nLanguages.enUS
    ? I18nLanguages.ptBR
    : I18nLanguages.enUS;
    
  appGlobalLocale.value = newLocale;
  sessionStorage.setItem("currentAppGlobalLocale", newLocale);
}
</script>
