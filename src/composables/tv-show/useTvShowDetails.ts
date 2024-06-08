import { ref, toValue, type MaybeRefOrGetter } from "vue";
import type { TvShowDetailsResponse } from "@/typings/interfaces";
import { useApiService } from "../useApiService";

export async function useTvShowDetails(tvShowId: MaybeRefOrGetter<number>) {

  const data = ref<TvShowDetailsResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const { apiService } = useApiService();
  const { data: tvShowDetailsResponse, isFinished: tvShowDetailsResponseIsFinished,
    error: tvShowDetailsResponseError } = await apiService<TvShowDetailsResponse>
    (`tv/${toValue(tvShowId)}?append_to_response=credits,videos,images`)
    .get()
    .json();

  data.value = tvShowDetailsResponse.value;
  isFinished.value = tvShowDetailsResponseIsFinished.value;
  error.value = tvShowDetailsResponseError.value;

  return {
    data,
    isFinished,
    error
  };
}
