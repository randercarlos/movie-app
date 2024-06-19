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
          <component :is="Component" />
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
import { onErrorCaptured, type Component as VueComponent } from "vue";
import CONFIG from "./config";
import PageSkeleton from "@/components/skeleton/PageSkeleton.vue";
import PageDetailsSkeleton from "@/components/skeleton/PageDetailsSkeleton.vue";

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
    ? (err.message ?? defaultMsg)
    : defaultMsg;

  push.error({
    title: "Error",
    message: msg
  });

  return false;
});
</script>
