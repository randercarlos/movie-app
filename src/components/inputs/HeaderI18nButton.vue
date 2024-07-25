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
import { I18nGlobalLocales } from "@/typings/enums";

const { locale: appGlobalLocale } = useI18n({ useScope: "global" });
const i18nOptions = computed(() => {
  return {
    flag: appGlobalLocale.value === I18nGlobalLocales.enUS
      ? "/img/brazil-flag.svg"
      : "/img/usa-flag.svg",
    changeTo: appGlobalLocale.value === I18nGlobalLocales.enUS
      ? "Mudar idioma para Português"
      : "Change idiom to English",
  };
});

onMounted(() => {
  // set global app locale
  appGlobalLocale.value = sessionStorage.getItem("currentAppGlobalLocale")
    ?? I18nGlobalLocales.enUS;
});

watch(appGlobalLocale, (newLocale) => {
  // change locale for all dates handle by moment.js
  changeMomentDateLocale(newLocale);
});

function toggleLanguage(): void {
  let newLocale = appGlobalLocale.value === I18nGlobalLocales.enUS
    ? I18nGlobalLocales.ptBR
    : I18nGlobalLocales.enUS;

  appGlobalLocale.value = newLocale;
  sessionStorage.setItem("currentAppGlobalLocale", newLocale);
}

function changeMomentDateLocale(locale: string): void {
  moment.locale(locale.toLowerCase());
}
</script>
