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
          <!-- remounts component when change app's route or app's locale changing :key attr -->
          <component
            :is="Component"
            :key="`${route.path}${appLocale}`"
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
import { onErrorCaptured, onMounted, watch, type Component as VueComponent } from "vue";
import CONFIG from "./config";
import PageSkeleton from "@/components/skeleton/PageSkeleton.vue";
import PageDetailsSkeleton from "@/components/skeleton/PageDetailsSkeleton.vue";
import { useI18n } from "vue-i18n";
import { useTitle } from "@vueuse/core";
import { isAppRunningTests } from "@/utils/helper";

// import driver.js to create tour
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { I18nGlobalLocales } from "./typings/enums";

const { locale: appLocale, t } = useI18n({
  useScope: "global",
});
const title = useTitle();

onMounted(() => {
  setDefaultAppLanguage();
  updateAppTitle();

  // disable tour in app when It's running unit or e2e tests
  if (! isAppRunningTests()) {
    createTourInApp();
  }
});

// when app's locale or route is changed, change app's document title
watch([appLocale], () => {
  updateAppTitle();
});

// change current document's title
function updateAppTitle(): void {
  title.value = t("general.title");
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


function createTourInApp(): void {
  const driverObj = driver({
    smoothScroll: true,
    showProgress: true,
    overlayOpacity: 0.8,
    nextBtnText: t("tour.nextButton"),
    prevBtnText: t("tour.previousButton"),
    doneBtnText: t("tour.doneButton"),
    progressText: t("tour.progressText"),
    onDestroyStarted: () => {
      if (!driverObj.hasNextStep() || confirm("Deseja sair do tour pelo site?")) {
        driverObj.destroy();
      }
    },
    steps: [
      {
        element: "document",
        popover: {
          title: t("tour.steps.step-01.title"),
          description: t("tour.steps.step-01.description"),
          side: "left",
          align: "start"
        }
      },
      {
        element: "[href='/movies']",
        popover: {
          title: t("tour.steps.step-02.title"),
          description: t("tour.steps.step-02.description"),
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "[href='/tv-shows']",
        popover: {
          title: t("tour.steps.step-03.title"),
          description: t("tour.steps.step-03.description"),
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "[href='/actors']",
        popover: {
          title: t("tour.steps.step-04.title"),
          description: t("tour.steps.step-04.description"),
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "button.bg-transparent",
        popover: {
          title: t("tour.steps.step-05.title"),
          description: t("tour.steps.step-05.description"),
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "#button-theme",
        popover: {
          title: t("tour.steps.step-06.title"),
          description: t("tour.steps.step-06.description"),
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "#searchDropdownInput",
        popover: {
          title: t("tour.steps.step-07.title"),
          description: t("tour.steps.step-07.description"),
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "[data-test='avatar-img']",
        popover: {
          title: t("tour.steps.step-08.title"),
          description: t("tour.steps.step-08.description"),
          side: "left",
          align: "start"
        }
      },
      {
        element: ".popular-movies > h2",
        popover: {
          title: t("tour.steps.step-09.title"),
          description: t("tour.steps.step-09.description"),
          side: "bottom",
          align: "start"
        }
      },
      {
        element: ".popular-movies > div.grid > div.mt-8 > a",
        popover: {
          title: t("tour.steps.step-10.title"),
          description: t("tour.steps.step-10.description"),
          side: "bottom",
          align: "start"
        }
      },
      {
        element: ".popular-movies > div.grid > div.mt-8 > div.mt-2 > a",
        popover: {
          title: t("tour.steps.step-11.title"),
          description: t("tour.steps.step-11.description"),
          side: "top",
          align: "start"
        }
      },
      {
        element: ".popular-movies > div.grid > div.mt-8 > div.mt-2 > div.mt-1",
        popover: {
          title: t("tour.steps.step-12.title"),
          description: t("tour.steps.step-12.description"),
          side: "top",
          align: "start"
        }
      },
      {
        element: ".popular-movies > div.grid > div.mt-8 > div.mt-2 > div:nth-child(3)",
        popover: {
          title: t("tour.steps.step-13.title"),
          description: t("tour.steps.step-13.description"),
          side: "top",
          align: "start"
        }
      },
      {
        element: ".now-playing-movies > h2",
        popover: {
          title: t("tour.steps.step-14.title"),
          description: t("tour.steps.step-14.description"),
          side: "top",
          align: "start"
        }
      },
    ]
  });

  driverObj.drive();
}

function isBrowserLanguageInPortuguese(): boolean {
  return navigator.language.startsWith("pt");
}

function setDefaultAppLanguage(): void {
  appLocale.value = isBrowserLanguageInPortuguese()
    ? I18nGlobalLocales.ptBR
    : I18nGlobalLocales.enUS;
}
</script>
