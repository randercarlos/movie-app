import { type MaybeRef, ref, unref } from "vue";
import type {
  TvShow,
  TvShowGenre,
  TvShowGenresResponse,
  TvShowResponse,
  TvShowResponseResult
} from "@/typings/interfaces";
import { formatDate, formatNumber } from "@/utils/helper";
import collect from "collect.js";

export function useTvShowsModelView(
  tvShowResponse: MaybeRef<TvShowResponse>,
  tvShowGenreResponse: MaybeRef<TvShowGenresResponse>
) {
  const data = ref<TvShow[]>([]);

  data.value = collect(unref(tvShowResponse).results)
    .map(function(tvShowResponseResult: TvShowResponseResult) {
      const genresFormatted = collect(tvShowResponseResult.genre_ids)
        .mapWithKeys((genreId: number) => [
          genreId,
          getGenreNameById(genreId)
        ])
        .values()
        .implode(", ");

      return collect(tvShowResponseResult)
        .merge({
          "poster_path": tvShowResponseResult.poster_path
            ? `https://image.tmdb.org/t/p/w500${tvShowResponseResult.poster_path}`
            : "https://via.placeholder.com/500x750",
          "vote_average": `${formatNumber(tvShowResponseResult.vote_average * 10, 0, 2)}%`,
          "first_air_date": formatDate(tvShowResponseResult.first_air_date, "MMM DD, YYYY"),
          "genres": genresFormatted,
        })
        .only([
          "poster_path", "id", "genre_ids", "name", "vote_average", "overview", "first_air_date",
          "genres",
        ])
        .all() as unknown as TvShow;
    }).all() as unknown as TvShow[];

  function getGenreNameById(genreId: number): string {
    return collect(unref(tvShowGenreResponse).genres)
      .mapWithKeys((genre: TvShowGenre) => [genre.id, genre.name])
      .get(genreId) as unknown as string;
  }

  return {
    data
  };
}
