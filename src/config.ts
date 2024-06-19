const CONFIG = {
  APP_NAME: "MovieApp",
  APP_ENV: String(import.meta.env.MODE) || "development",
  APP_IS_DEV: Boolean(import.meta.env.DEV),
  APP_IS_PROD: Boolean(import.meta.env.PROD),
  APP_BASE_URL: String(import.meta.env.VITE_BASE_URL) || String(import.meta.env.BASE_URL) || "/",
  API_BASE_URL: String(import.meta.env.VITE_API_HOST) || "",

  TMDB_TOKEN: String(import.meta.env.VITE_TMDB_TOKEN) || "",

  MOVIE_CREW_QTY: 3,
  MOVIE_CAST_QTY: 5,
  MOVIE_IMAGES_QTY: 12,
  ACTOR_IMAGES_QTY: 15,
};

export default CONFIG;
