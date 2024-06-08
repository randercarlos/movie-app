import { createRouter, createWebHistory } from "vue-router";
import Movies from "@/pages/Movies.vue";

const Movie = () => import("@/pages/Movie.vue");
const TvShows = () => import("@/pages/TvShows.vue");
const TvShow = () => import("@/pages/TvShow.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "movies" }
    },
    {
      path: "/movies",
      name: "movies",
      component: Movies
    },
    {
      path: "/movies/:movieId(\\d+)",
      name: "movie",
      component: Movie
    },
    {
      path: "/tv-shows",
      name: "tvShows",
      component: TvShows
    },
    {
      path: "/tv-shows/:tvShowId(\\d+)",
      name: "tvShow",
      component: TvShow
    },
    {
      path: "/actors",
      name: "actors",
      component: Movies
    },
    {
      path: "/actors/:actorId(\\d+)",
      name: "actor",
      component: Movies
    },
    // { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
  strict: true
});

export default router;
