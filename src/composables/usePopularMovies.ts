import { ref } from "vue";
import type {
  MovieResponse,
} from "@/typings/interfaces";
import { useApiService } from "./useApiService";

export async function usePopularMovies() {

  const data = ref<MovieResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const { apiService } = useApiService();
  const { data: movieResponse, isFinished: movieResponseIsFinished, error: movieResponseError } =
      await apiService<MovieResponse>("movie/popular")
        .get()
        .json();

  // const { movieGenres: moviesGenresResponse } = useMovieGenres();
  // console.log(moviesGenresResponse.value);
  // const { data: moviesModelView } = await useMoviesModelView(
  //   movieResponse,
  //   moviesGenresResponse as MaybeRef<MovieGenresResponse>
  // );
  data.value = movieResponse.value;
  isFinished.value = movieResponseIsFinished.value;
  error.value = movieResponseError.value;

  return {
    data,
    isFinished,
    error,
  };
}
