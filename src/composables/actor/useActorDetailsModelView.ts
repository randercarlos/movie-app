import { type MaybeRef, ref, unref } from "vue";
import type {
  ActorDetails,
  ActorDetailsResponse,
  CombinedCreditsMovie,
} from "@/typings/interfaces";
import collect from "collect.js";
import { calculateAge, formatDate } from "@/utils/helper";
import CONFIG from "@/config";

export function useActorDetailsModelView(actorDetailsResponse: MaybeRef<ActorDetailsResponse>) {
  const data = ref<ActorDetails>();
  const actorDetailsResponseValue = unref(actorDetailsResponse);

  console.log("ACTOR RESPONSE", actorDetailsResponseValue);
  const actor = collect(actorDetailsResponseValue)
    .merge({
      "profile_path": actorDetailsResponseValue.profile_path
        ? `https://image.tmdb.org/t/p/w500${actorDetailsResponseValue.profile_path}`
        : "https://via.placeholder.com/500x750",
      "birthday": `${formatDate(actorDetailsResponseValue.birthday, "MMM DD, YYYY")}`,
      "age": calculateAge(actorDetailsResponseValue.birthday)
    })
    .only([
      "birthday", "age", "profile_path", "name", "id", "homepage", "place_of_birth", "biography"
    ])
    .all();

  const social = collect(actorDetailsResponseValue)
    .merge({
      "twitter": actorDetailsResponseValue.external_ids.twitter_id
        ? `https://twitter.com/${actorDetailsResponseValue.external_ids.twitter_id}` : null,
      "facebook": actorDetailsResponseValue.external_ids.facebook_id
        ? `https://facebook.com/${actorDetailsResponseValue.external_ids.facebook_id}` : null,
      "instagram": actorDetailsResponseValue.external_ids.instagram_id
        ? `https://instagram.com/${actorDetailsResponseValue.external_ids.instagram_id}` : null,
    })
    .only([
      "facebook", "instagram", "twitter",
    ])
    .all();

  const knownForMovies = collect(actorDetailsResponseValue.combined_credits.cast)
    .sortByDesc("popularity")
    .take(5)
    .map(function(castActor: CombinedCreditsMovie) {
      const title = castActor?.title ?? castActor?.name ?? "Untitled";

      return collect(castActor)
        .merge({
          "poster_path": castActor.poster_path
            ? `https://image.tmdb.org/t/p/w185${castActor.poster_path}`
            : "https://via.placeholder.com/185x278",
          "title": title,
          "linkToPage": castActor.media_type === "movie"
            ? { name: "movie", params: { movieId: castActor.id } }
            : { name: "tvShow", params: { tvShowId: castActor.id } }
        }).only([
          "poster_path", "title", "id", "media_type", "linkToPage",
        ]).all();
    }).all();

  const credits = collect(actorDetailsResponseValue.combined_credits.cast)
    .map(function(castActor: CombinedCreditsMovie) {
      const releaseDate = castActor?.release_date ?? castActor?.first_air_date ?? "";
      const title = castActor?.title ?? castActor?.name ?? "Untitled";

      return collect(castActor)
        .merge({
          "release_date": releaseDate,
          "release_year": releaseDate ? formatDate(releaseDate, "YYYY"): "Future",
          "title": title,
          "character": castActor.character ?? "",
          "linkToPage": castActor.media_type === "movie"
            ? { name: "movie", params: { movieId: castActor.id } }
            : { name: "tvShow", params: { tvShowId: castActor.id } }
        }).only([
          "release_date", "release_year", "title", "character", "linkToPage"
        ]).all();
    })
    .sortByDesc("release_date")
    .all();

  const images = collect(actorDetailsResponseValue.images?.profiles)
    .take(CONFIG.ACTOR_IMAGES_QTY)
    .all();

  data.value = {
    actor,
    social,
    knownForMovies,
    credits,
    images
  } as unknown as ActorDetails;

  console.log("ACTOR DETAIS", data.value);
  return {
    data
  };
}
