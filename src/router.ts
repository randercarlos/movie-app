import { createRouter, createWebHistory } from "vue-router";
import Movies from "@/pages/Movies.vue";

const Movie = () => import("@/pages/Movie.vue");
const TvShows = () => import("@/pages/TvShows.vue");
const TvShow = () => import("@/pages/TvShow.vue");
const Actors = () => import("@/pages/Actors.vue");
const Actor = () => import("@/pages/Actor.vue");

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
      component: Actors
    },
    {
      path: "/actors/:actorId(\\d+)",
      name: "actor",
      component: Actor
    },
  ],
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0 });
      }, 200);
    });
  },
  strict: true
});

export default router;
