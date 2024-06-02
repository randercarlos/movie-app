import type { useFetch } from "@vueuse/core";

export type ParamsObject = Record<string, string | boolean | null>;

export type UseFetchReturn<T> = ReturnType<typeof useFetch<T>>;
