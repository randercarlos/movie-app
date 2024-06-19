import type { useFetch } from "@vueuse/core";
import type {
  MultiSearchActorResponseResult,
  MultiSearchMovieResponseResult,
  MultiSearchTvShowResponseResult
} from "./interfaces";

export type ParamsObject = Record<string, string | boolean | null>;

export type UseFetchReturn<T> = ReturnType<typeof useFetch<T>>;

export type DetailsRoute = {
  name: "movie" | "tvShow" | "actor";
  params: { movieId: number } | { tvShowId: number } | { actorId: number };
};

export type MultiSearchResponseResult = MultiSearchMovieResponseResult
  | MultiSearchTvShowResponseResult | MultiSearchActorResponseResult;
