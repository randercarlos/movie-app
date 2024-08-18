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

const { locale: appLocale, t } = useI18n({ useScope: "global" });
const title = useTitle();

onMounted(() => {
  updateAppTitle();

  if (! isAppRunningTests()) {
    createTourInApp();
  }
});

// when app's locale or route is changed, change app's document title
watch([appLocale], () => {
  updateAppTitle();
});

function updateAppTitle(): void {
  // change current document's title
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
    nextBtnText: "Próximo",
    prevBtnText: "Anterior",
    doneBtnText: "Concluído",
    progressText: "{{current}} de {{total}}",
    // onDestroyStarted: () => {
    //   if (!driverObj.hasNextStep() || confirm("Deseja sair do tour pelo site?")) {
    //     driverObj.destroy();
    //   }
    // },
    steps: [
      {
        element: "document",
        popover: {
          title: "Tour pelo site",
          description: "Seja bem vindo ao <b>Filmes e Séries!</b> <br /><br />"
          + "Este guia vai mostrar os <b>principais recursos</b> deste site.",
          side: "left",
          align: "start"
        }
      },
      {
        element: "[href='/movies']",
        popover: {
          title: "Menu de filmes",
          description: "Clique para ver os filmes <b>populares</b> ou filmes em <b>exibição</b>.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "[href='/tv-shows']",
        popover: {
          title: "Menu de séries",
          description: "Clique para ver as séries <b>populares</b> ou séries que estão "
        + "<b>passando agora</b>.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "[href='/actors']",
        popover: {
          title: "Menu de atores",
          description: "Clique para ver as os atores <b>em alta</b> e mais <b>populares</b>.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "button.bg-transparent",
        popover: {
          title: "Troca de idioma",
          description: "Clique para trocar o <b>idioma</b> entre <b>português</b> e <b>inglês</b>.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "#button-theme",
        popover: {
          title: "Troca do tema",
          description: "Clique para trocar o <b>tema</b> entre <b>claro</b> e <b>escuro</b>.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "#searchDropdownInput",
        popover: {
          title: "Busca",
          description: "Pesquise por <b>filmes</b>, <b>séries</b> ou <b>atores</b>. "
          + "Limite de <b>7 resultados</b>.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: "[data-test='avatar-img']",
        popover: {
          title: "Avatar",
          description: "Imagem do usuário logado...",
          side: "left",
          align: "start"
        }
      },
      {
        element: ".popular-movies > h2",
        popover: {
          title: "Seção filmes populares",
          description: "Lista os <b>20</b> filmes mais <b>populares</b>.",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: ".popular-movies > div.grid > div.mt-8 > a",
        popover: {
          title: "Poster do Filme",
          description: "Clique para ver os <b>detalhes</b> do filme...",
          side: "bottom",
          align: "start"
        }
      },
      {
        element: ".popular-movies > div.grid > div.mt-8 > div.mt-2 > a",
        popover: {
          title: "Nome do Filme",
          description: "Clique para ver os <b>detalhes</b> do filme...",
          side: "top",
          align: "start"
        }
      },
      {
        element: ".popular-movies > div.grid > div.mt-8 > div.mt-2 > div.mt-1",
        popover: {
          title: "Dados do filme",
          description: "<b>Nota</b> do filme no IMDB e <b>data de lançamento</b> do filme.",
          side: "top",
          align: "start"
        }
      },
      {
        element: ".popular-movies > div.grid > div.mt-8 > div.mt-2 > div:nth-child(3)",
        popover: {
          title: "Gênero do filme",
          description: "Lista os <b>gêneros</b> do filme.",
          side: "top",
          align: "start"
        }
      },
      {
        element: ".now-playing-movies > h2",
        popover: {
          title: "Seção filmes em cartaz",
          description: "Lista os <b>20</b> filmes <b>em cartaz</b> mais populares.",
          side: "top",
          align: "start"
        }
      },
    ]
  });

  driverObj.drive();
}
</script>
