import { ref } from "vue";
import { useApiService } from "@/composables/useApiService";
import type { MovieGenresResponse } from "@/typings/interfaces";

export async function useMovieGenres() {
  const data = ref<MovieGenresResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error>();

  const { apiService } = useApiService();
  const { data: movieGenresResponse, isFinished: movieGenresIsFinished, error: movieGenresError }
      = await apiService<MovieGenresResponse>("genre/movie/list")
        .get()
        .json();
  data.value = movieGenresResponse.value;
  isFinished.value = movieGenresIsFinished.value;
  error.value = movieGenresError.value;

  return {
    data,
    isFinished,
    error
  };
}
