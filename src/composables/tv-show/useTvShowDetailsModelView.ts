import { type MaybeRef, ref, unref } from "vue";
import type {
  TvShowCreditsCastMember,
  TvShowDetails,
  TvShowDetailsResponse,
} from "@/typings/interfaces";
import collect from "collect.js";
import moment from "moment";
import CONFIG from "@/config";
import { formatNumber } from "@/utils/helper";

export function useTvShowDetailsModelView(tvShowDetailsResponse: MaybeRef<TvShowDetailsResponse>) {
  const data = ref<TvShowDetails>();
  const tvShowDetailsResponseValue = unref(tvShowDetailsResponse);

  data.value = collect(tvShowDetailsResponseValue)
    .merge({
      "poster_path": tvShowDetailsResponseValue.poster_path
        ? `https://image.tmdb.org/t/p/w500${tvShowDetailsResponseValue.poster_path}`
        : "https://via.placeholder.com/500x750",
      "vote_average": `${formatNumber(tvShowDetailsResponseValue.vote_average  * 10, 0, 2)}%`,
      "first_air_date": moment(tvShowDetailsResponseValue.first_air_date).format("MMM DD, YYYY"),
      "genres": collect(tvShowDetailsResponseValue.genres).pluck("name").flatten().implode(", "),
      "cast": collect(tvShowDetailsResponseValue.credits?.cast).take(CONFIG.MOVIE_CAST_QTY)
        .map(function(cast: TvShowCreditsCastMember) {
          return collect(cast).merge({
            "profile_path": cast.profile_path
              ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
              : "https://via.placeholder.com/300x450",
          }).all();
        }).all(),
      "images": collect(tvShowDetailsResponseValue.images?.backdrops)
        ?.take(CONFIG.MOVIE_IMAGES_QTY)
        .all(),
    })
    .only(["poster_path", "id", "genres", "name", "vote_average", "overview", "first_air_date",
      "credits", "videos", "images", "crew", "cast", "created_by"])
    .all() as unknown as TvShowDetails;

  return {
    data
  };
}
