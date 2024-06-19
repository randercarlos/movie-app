import { ref, toValue, type MaybeRefOrGetter } from "vue";
import type { ActorDetailsResponse } from "@/typings/interfaces";
import { useApiService } from "../useApiService";

export async function useActorDetails(actorId: MaybeRefOrGetter<number>) {

  const data = ref<ActorDetailsResponse>();
  const isFinished = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const { apiService } = useApiService();
  const { data: actorDetailsResponse, isFinished: actorDetailsResponseIsFinished,
    error: actorDetailsResponseError } = await apiService<ActorDetailsResponse>
    (`person/${toValue(actorId)}?append_to_response=images,external_ids,combined_credits`)
    .get()
    .json();

  data.value = actorDetailsResponse.value;
  isFinished.value = actorDetailsResponseIsFinished.value;
  error.value = actorDetailsResponseError.value;

  return {
    data,
    isFinished,
    error
  };
}
