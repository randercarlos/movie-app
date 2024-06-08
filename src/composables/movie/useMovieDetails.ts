import { ref, toValue, type MaybeRefOrGetter } from "vue";
import type { MovieDetailsResponse } from "@/typings/interfaces";
import { useApiService } from "../useApiService";

export async function useMovieDetails(movieId: MaybeRefOrGetter<number>) {

  const data = ref<MovieDetailsResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const { apiService } = useApiService();
  const { data: movieDetailsResponse, isFinished: movieDetailsResponseIsFinished,
    error: movieDetailsResponseError } = await apiService<MovieDetailsResponse>
    (`movie/${toValue(movieId)}?append_to_response=credits,videos,images`)
    .get()
    .json();

  data.value = movieDetailsResponse.value;
  isFinished.value = movieDetailsResponseIsFinished.value;
  error.value = movieDetailsResponseError.value;

  return {
    data,
    isFinished,
    error
  };
}
