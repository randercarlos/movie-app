import { type MaybeRef, ref, unref } from "vue";
import type {
  Movie,
  MovieGenre,
  MovieGenresResponse,
  MovieResponse,
  MovieResponseResult
} from "@/typings/interfaces";
import { formatDate, formatNumber } from "@/utils/helper";
import collect from "collect.js";

export function useMoviesModelView(
  movieResponse: MaybeRef<MovieResponse>,
  movieGenreResponse: MaybeRef<MovieGenresResponse>
) {
  const data = ref<Movie[]>([]);

  data.value = collect(unref(movieResponse).results)
    .map(function(movieResponseResult: MovieResponseResult) {
      const genresFormatted = collect(movieResponseResult.genre_ids)
        .mapWithKeys((genreId: number) => [
          genreId,
          getGenreNameById(genreId)
        ])
        .values()
        .implode(", ");

      return collect(movieResponseResult)
        .merge({
          "poster_path": movieResponseResult.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieResponseResult.poster_path}`
            : "https://via.placeholder.com/500x750",
          "vote_average": `${formatNumber(movieResponseResult.vote_average * 10, 0, 2)}%`,
          "release_date": formatDate(movieResponseResult.release_date, "MMM DD, YYYY"),
          "genres": genresFormatted,
        })
        .only([
          "poster_path", "id", "genre_ids", "title", "vote_average", "overview", "release_date",
          "genres",
        ])
        .all() as unknown as Movie;
    }).all() as unknown as Movie[];

  function getGenreNameById(genreId: number): string {
    return collect(unref(movieGenreResponse).genres)
      .mapWithKeys((genre: MovieGenre) => [genre.id, genre.name])
      .get(genreId) as unknown as string;
  }

  return {
    data
  };
}
