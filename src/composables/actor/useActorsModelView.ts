import { type MaybeRef, ref, unref } from "vue";
import type {
  Actor,
  ActorResponse,
  ActorResponseResult
} from "@/typings/interfaces";
import collect from "collect.js";

export function useActorsModelView(
  actorsResponse: MaybeRef<ActorResponse>
) {
  const data = ref<Actor[]>([]);

  data.value = collect(unref(actorsResponse).results)
    .map(function(actorResponseResult: ActorResponseResult) {
      return collect(actorResponseResult)
        .merge({
          "profile_path": actorResponseResult.profile_path
            ? `https://image.tmdb.org/t/p/w300${actorResponseResult.profile_path}`
            : `https://ui-avatars.com/api/?size=300&name=${actorResponseResult.name}`,
          "known_for": collect(actorResponseResult.known_for)
            .where("media_type", "movie").pluck("title").union(
              collect(actorResponseResult.known_for).where("media_type", "tv").pluck("name")
            ).implode(", ")
        })
        .only([
          "name", "id", "profile_path", "known_for",
        ])
        .all() as unknown as Actor;
    }).all() as unknown as Actor[];

  return {
    data
  };
}
