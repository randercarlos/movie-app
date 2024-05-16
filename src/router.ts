import { createRouter, createWebHistory } from "vue-router";

const PopularMovies = () => import("@/components/PopularMovies.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "popularMovies",
      component: PopularMovies
    },
  ]
});

export default router;
