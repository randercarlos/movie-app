const CONFIG = {
  APP_NAME: "MovieApp",
  APP_BASE_URL: String(import.meta.env.VITE_BASE_URL) || "",
  API_BASE_URL: String(import.meta.env.VITE_API_HOST) || "",
  TMDB_TOKEN: String(import.meta.env.VITE_TMDB_TOKEN) || "",
  MOVIE_CREW_QTY: 3,
  MOVIE_CAST_QTY: 5,
  MOVIE_IMAGES_QTY: 12,
};

export default CONFIG;
