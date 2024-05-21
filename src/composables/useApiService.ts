import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from "vue";
import { createFetch } from "@vueuse/core";
import CONFIG from "@/config";
import type { ParamsObject, UseFetchReturn } from "@/typings/types";
import { getQueryParamsFromObject, isObjectEmpty } from "@/utils/helper";

export function useApiService(endpoint: MaybeRefOrGetter<string>) {
  const apiService = createFetch({
    baseUrl: CONFIG.API_BASE_URL,
    options: {
      async beforeFetch({ options }) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${CONFIG.TMDB_TOKEN}`
        };

        return { options };
      },
    },
    fetchOptions: {
      mode: "cors",
    },
  });

  function getEndpointWithParams(params: MaybeRefOrGetter<ParamsObject>): ComputedRef<string> {
    const paramsValue = toValue(params);

    return computed<string>(() => !isObjectEmpty(paramsValue)
      ? `${toValue(endpoint)}?${getQueryParamsFromObject(paramsValue)}`
      : toValue(endpoint));
  }

  const list = <T>(params: MaybeRefOrGetter<ParamsObject> = {}): UseFetchReturn<T> => {
    const endpointWithParams = getEndpointWithParams(params);

    return apiService(endpointWithParams).get().json<T>();
  };

  const find = <T>(id: MaybeRefOrGetter<number>, params: MaybeRefOrGetter<ParamsObject> = {}):
    UseFetchReturn<T> => {
    const paramsValue = toValue(params);
    const fullEndpointWithParams = computed<string>(() =>
      (`${toValue(endpoint)}/${toValue(id)}${!isObjectEmpty(paramsValue)
        && `?${getQueryParamsFromObject(paramsValue)}`}`));

    return apiService<T>(fullEndpointWithParams).get().json();
  };

  const create = <T>(payload: MaybeRefOrGetter<ParamsObject>): UseFetchReturn<T> => {
    return apiService<T>(endpoint).post(payload).json();
  };

  const update = <T>(id: MaybeRefOrGetter<number>, payload: MaybeRefOrGetter<ParamsObject>):
    UseFetchReturn<T> => {
    const fullEndpoint = computed<string>(() => (`${toValue(endpoint)}/${toValue(id)}`));

    return apiService<T>(fullEndpoint).put(payload).json();
  };

  const remove = <T>(id: MaybeRefOrGetter<number>): UseFetchReturn<T> => {
    const fullEndpoint = computed<string>(() => (`${toValue(endpoint)}/${toValue(id)}`));

    return apiService<T>(fullEndpoint).delete().json();
  };

  return {
    list,
    find,
    create,
    update,
    remove
  };
}
