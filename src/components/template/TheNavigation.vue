<template>
  <nav
    class="container mx-auto px-4 flex flex-col md:flex-row items-center
  justify-between px-4 py-6"
  >
    <ul class="flex flex-col md:flex-row items-center font-extrabold text-2xl">
      <li>
        <RouterLink to="/">
          <img
            :src="isDark ? '/img/logo2-resize.png' : '/img/logo1-resize.png'"
            alt="Logo"
            title="logo"
            rel="preload"
            as="image"
          >
        </RouterLink>
      </li>
      <li class="md:ml-16 mt-3 md:mt-0">
        <RouterLink
          :to="{ name: 'movies' }"
          class="hover:text-orange-600 lg:text-2xl lg:font-semibold transition
            ease-in-out delay-100 text-gray-500 dark:text-gray-300 dark:hover:text-sky-500"
          exact-active-class="text-orange-600 underline dark:text-sky-500"
        >
          {{ t('header.menu.movies') }}
        </RouterLink>
      </li>
      <li class="md:ml-6 mt-3 md:mt-0">
        <RouterLink
          :to="{ name: 'tvShows'}"
          class="hover:text-orange-600 lg:text-2xl lg:font-semibold transition
            ease-in-out delay-100 text-gray-500 dark:text-gray-300 dark:hover:text-sky-500"
          exact-active-class="text-orange-600 underline dark:text-sky-500"
        >
          {{ t('header.menu.tvShows') }}
        </RouterLink>
      </li>
      <li class="md:ml-6 mt-3 md:mt-0">
        <RouterLink
          :to="{ name: 'actors'}"
          class="hover:text-orange-600 lg:text-2xl lg:font-semibold transition
            ease-in-out delay-100 text-gray-500 dark:text-gray-300 dark:hover:text-sky-500"
          exact-active-class="text-orange-600 underline dark:text-sky-500"
        >
          {{ t('header.menu.actors') }}
        </RouterLink>
      </li>
    </ul>
    <div class="flex flex-col md:flex-row items-center">
      <HeaderI18nButton />
      <HeaderThemeButtom />
      <HeaderDropdown />
      <div class="md:ml-4 mt-3 md:mt-0">
        <a href="#">
          <img
            data-test="avatar-img"
            src="/img/avatar.jpg"
            alt="avatar"
            class="rounded-full w-8 h-8"
          >
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import HeaderDropdown from "@/components/inputs/HeaderDropdown.vue";
import HeaderThemeButtom from "@/components/inputs/HeaderThemeButton.vue";
import HeaderI18nButton from "@/components/inputs/HeaderI18nButton.vue";
import { useI18n } from "vue-i18n";
import { useDark } from "@vueuse/core";

const { t } = useI18n({ useScope: "global" });
const isDark = useDark();
</script>
