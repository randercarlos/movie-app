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

  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <template #default>
          <component :is="Component" />
        </template>
        <template #fallback>
          Loading...
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
import { onErrorCaptured } from "vue";
import CONFIG from "./config";

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
