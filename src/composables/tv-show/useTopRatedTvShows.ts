import { ref } from "vue";
import type {
  TvShowResponse,
} from "@/typings/interfaces";
import { useApiService } from "../useApiService";

export async function useTopRatedTvShows() {

  const data = ref<TvShowResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const { apiService } = useApiService();
  const { data: tvShowResponse, isFinished: tvShowResponseIsFinished, error: tvShowResponseError } =
    await apiService<TvShowResponse>("tv/top_rated")
      .get()
      .json();

  data.value = tvShowResponse.value;
  isFinished.value = tvShowResponseIsFinished.value;
  error.value = tvShowResponseError.value;

  return {
    data,
    isFinished,
    error,
  };
}
