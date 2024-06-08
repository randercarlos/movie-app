import { ref } from "vue";
import type {
  TvShowResponse,
} from "@/typings/interfaces";
import { useApiService } from "../useApiService";

export async function usePopularTvShows() {

  const data = ref<TvShowResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const { apiService } = useApiService();
  const { data: tvShowResponse, isFinished: tvShowResponseIsFinished, error: tvShowResponseError } =
      await apiService<TvShowResponse>("tv/popular")
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
