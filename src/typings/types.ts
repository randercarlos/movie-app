import type { useFetch } from "@vueuse/core";
// import type { MovieDetails } from "./interfaces";

export type ParamsObject = Record<string, string | boolean | null>;

export type UseFetchReturn<T> = ReturnType<typeof useFetch<T>>;

// export type MovieDetailsResponse = Partial<MovieDetails>;
