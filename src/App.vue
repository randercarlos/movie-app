<template>
  <Notivue v-slot="item">
    <Notification
      :item="item"
      :theme="pastelTheme"
    >
      <NotificationProgress :item="item" />
    </Notification>
  </Notivue>

  <TheHeader />

  <RouterView v-slot="{ Component, route }">
    <template v-if="Component">
      <Suspense>
        <template #default>
          <component
            :is="Component"
            :key="currentComponentKey"
          />
        </template>
        <template #fallback>
          <!-- Keep skeleton components in memory due to once loaded, it don't change -->
          <KeepAlive>
            <component :is="getSkeletonComponentForRouteName(route.name as string)" />
          </KeepAlive>
        </template>
      </Suspense>
    </template>
  </RouterView>

  <TheFooter />
</template>

<script setup lang="ts">
import TheHeader from "@/components/template/TheHeader.vue";
import TheFooter from "@/components/template/TheFooter.vue";
import { Notivue, Notification, push, pastelTheme, NotificationProgress } from "notivue";
import { onErrorCaptured, onMounted, ref, watch, type Component as VueComponent } from "vue";
import CONFIG from "./config";
import PageSkeleton from "@/components/skeleton/PageSkeleton.vue";
import PageDetailsSkeleton from "@/components/skeleton/PageDetailsSkeleton.vue";
import { useI18n } from "vue-i18n";
import moment from "moment";
import { useTitle } from "@vueuse/core";

const { locale: appLocale, t } = useI18n({ useScope: "global" });
const currentComponentKey = ref(0);
const title = useTitle();

onMounted(() => {
  updateAppTitle();
});
// when app's locale is changed, remounts the component to fetch data with new locale
watch(appLocale, () => {
  remountCurrentComponent();
  updateAppTitle();
});

function updateAppTitle(): void {
  // change current document's title
  title.value = t("general.title");
}

function remountCurrentComponent(): void {
  // on change component's key, the component is remounted
  currentComponentKey.value = moment().valueOf();
}

function getSkeletonComponentForRouteName(routeName: string): VueComponent {
  const routeNameToSkeletonComponentMap: Record<string, VueComponent> = {
    "movies": PageSkeleton,
    "movie": PageDetailsSkeleton,
    "tv-shows": PageSkeleton,
    "tv-show": PageDetailsSkeleton,
    "actors": PageSkeleton,
    "actor": PageDetailsSkeleton,
  };

  return routeNameToSkeletonComponentMap[routeName] || PageSkeleton;
}

onErrorCaptured((err) => {
  const defaultMsg = "A error happened. Try again later. If error persists, contact support.";
  const msg = CONFIG.APP_IS_DEV
    ? (err.message !== "" ? err.message: defaultMsg)
    : defaultMsg;

  push.error({
    title: "Error",
    message: msg
  });

  return false;
});
</script>
