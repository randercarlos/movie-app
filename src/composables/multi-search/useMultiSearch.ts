import { ref, toValue, type MaybeRefOrGetter } from "vue";
import type { MultiSearchResponse } from "@/typings/interfaces";
import { useApiService } from "../useApiService";

export async function useMultiSearch(search: MaybeRefOrGetter<string>) {

  const data = ref<MultiSearchResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const { apiService } = useApiService();
  const { data: multiSearchResponse, isFinished: multiSearchResponseIsFinished,
    error: multiSearchResponseError } =
    await apiService<MultiSearchResponse>(`search/multi?query=${toValue(search)}`)
      .get()
      .json();

  data.value = multiSearchResponse.value;
  isFinished.value = multiSearchResponseIsFinished.value;
  error.value = multiSearchResponseError.value;

  return {
    data,
    isFinished,
    error,
  };
}
