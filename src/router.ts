import { createRouter, createWebHistory } from "vue-router";

const MoviesPage = () => import("@/pages/MoviesPage.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "moviesPage",
      component: MoviesPage
    },
  ]
});

export default router;
