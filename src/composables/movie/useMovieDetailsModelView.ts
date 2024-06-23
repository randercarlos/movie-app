import { type MaybeRef, ref, unref } from "vue";
import type {
  MovieCreditsCast,
  MovieDetails,
  MovieDetailsResponse,
} from "@/typings/interfaces";
import collect from "collect.js";
import moment from "moment";
import CONFIG from "@/config";
import { formatNumber } from "@/utils/helper";

export function useMovieDetailsModelView(movieDetailsResponse: MaybeRef<MovieDetailsResponse>) {
  const data = ref<MovieDetails>();
  const movieDetailsResponseValue = unref(movieDetailsResponse);

  data.value = collect(movieDetailsResponseValue)
    .merge({
      "poster_path": movieDetailsResponseValue.poster_path
        ? `https://image.tmdb.org/t/p/w500${movieDetailsResponseValue.poster_path}`
        : "https://via.placeholder.com/500x750",
      "vote_average": `${formatNumber(movieDetailsResponseValue.vote_average  * 10, 0, 2)}%`,
      "release_date": moment(movieDetailsResponseValue.release_date).format("MMM DD, YYYY"),
      "genres": collect(movieDetailsResponseValue.genres).pluck("name").flatten().implode(", "),
      "crew": collect(unref(movieDetailsResponseValue.credits?.crew)).take(CONFIG.MOVIE_CREW_QTY)
        .all(),
      "cast": collect(movieDetailsResponseValue.credits?.cast).take(CONFIG.MOVIE_CAST_QTY)
        .map(function(cast: MovieCreditsCast) {
          return collect(cast).merge({
            "profile_path": cast.profile_path
              ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
              : "https://via.placeholder.com/300x450",
          }).all();
        }).all(),
      "images": collect(movieDetailsResponseValue.images?.backdrops)
        ?.take(CONFIG.MOVIE_IMAGES_QTY)
        .all(),
    })
    .only(["poster_path", "id", "genres", "title", "vote_average", "overview", "release_date",
      "credits", "videos", "images", "crew", "cast", "images"])
    .all() as unknown as MovieDetails;

  return {
    data
  };
}
