import { ref } from "vue";
import { useApiService } from "@/composables/useApiService";
import type { TvShowGenresResponse } from "@/typings/interfaces";

export async function useTvShowGenres() {
  const data = ref<TvShowGenresResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error>();

  const { apiService } = useApiService();
  const { data: tvShowGenresResponse, isFinished: tvShowGenresIsFinished, error: tvShowGenresError }
      = await apiService<TvShowGenresResponse>("genre/tv/list")
        .get()
        .json();
  data.value = tvShowGenresResponse.value;
  isFinished.value = tvShowGenresIsFinished.value;
  error.value = tvShowGenresError.value;

  return {
    data,
    isFinished,
    error
  };
}
