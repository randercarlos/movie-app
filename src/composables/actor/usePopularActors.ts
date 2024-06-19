import { ref, toValue, type MaybeRefOrGetter } from "vue";
import type {
  ActorResponse,
} from "@/typings/interfaces";
import { useApiService } from "../useApiService";
import { getEndpointWithQueryParams } from "@/utils/helper";

export async function usePopularActors(page: MaybeRefOrGetter<number> = 1) {

  const data = ref<ActorResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error | null>(null);
  
  const searchParams = new URLSearchParams({
    page: String(toValue(page))
  });

  const { apiService } = useApiService();
  const { data: actorResponse, isFinished: actorResponseIsFinished, error: actorResponseError } =
      await apiService<ActorResponse>(getEndpointWithQueryParams("person/popular", searchParams))
        .get()
        .json();

  data.value = actorResponse.value;
  isFinished.value = actorResponseIsFinished.value;
  error.value = actorResponseError.value;

  return {
    data,
    isFinished,
    error,
  };
}
