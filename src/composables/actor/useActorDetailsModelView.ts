import { type MaybeRef, ref, unref } from "vue";
import type {
  ActorCombinedCredits,
  ActorDetails,
  ActorDetailsResponse,
  ActorImagesProfile,
} from "@/typings/interfaces";
import collect from "collect.js";
import { calculateAge, formatDate } from "@/utils/helper";
import CONFIG from "@/config";

export function useActorDetailsModelView(actorDetailsResponse: MaybeRef<ActorDetailsResponse>) {
  const data = ref<ActorDetails>();
  const actorDetailsResponseValue = unref(actorDetailsResponse);

  const actor = collect(actorDetailsResponseValue)
    .merge({
      "profile_path": actorDetailsResponseValue.profile_path
        ? `https://image.tmdb.org/t/p/w500${actorDetailsResponseValue.profile_path}`
        : "https://placehold.co/500x750",
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
      "youtube": actorDetailsResponseValue.external_ids.youtube_id
        ? `https://youtube.com/${actorDetailsResponseValue.external_ids.youtube_id}` : null,
      "tiktok": actorDetailsResponseValue.external_ids.tiktok_id
        ? `https://tiktok.com/${actorDetailsResponseValue.external_ids.tiktok_id}` : null,
      "wikipedia": actorDetailsResponseValue.external_ids.wikidata_id
        ? `https://www.wikidata.org/wiki/${actorDetailsResponseValue.external_ids.wikidata_id}`
        : null,
    })
    .only([
      "facebook", "instagram", "twitter", "youtube", "tiktok", "wikipedia"
    ])
    .all();

  const knownForMovies = collect(actorDetailsResponseValue.combined_credits.cast)
    .sortByDesc("popularity")
    .take(5)
    .map(function(castActor: ActorCombinedCredits) {
      const title = castActor?.title ?? castActor?.name ?? "Untitled";

      return collect(castActor)
        .merge({
          "poster_path": castActor.poster_path
            ? `https://image.tmdb.org/t/p/w185${castActor.poster_path}`
            : "https://placehold.co/185x278",
          "title": title,
          "linkToPage": castActor.media_type === "movie"
            ? { name: "movie", params: { movieId: castActor.id } }
            : { name: "tvShow", params: { tvShowId: castActor.id } }
        }).only([
          "poster_path", "title", "id", "media_type", "linkToPage",
        ]).all();
    }).all();

  const credits = collect(actorDetailsResponseValue.combined_credits.cast)
    .map(function(actorCombinedCredits: ActorCombinedCredits) {
      const releaseDate = actorCombinedCredits?.release_date
        ?? actorCombinedCredits?.first_air_date ?? "Future";
      const releaseYear = formatDate(actorCombinedCredits?.release_date, "YYYY")
        ?? formatDate(actorCombinedCredits?.first_air_date, "YYYY")
        ?? "Future";
      const title = actorCombinedCredits?.title ?? actorCombinedCredits?.name ?? "Untitled";

      return collect(actorCombinedCredits)
        .merge({
          "release_date": releaseDate,
          "release_year": releaseYear,
          "title": title,
          "character": actorCombinedCredits.character ?? "",
          "linkToPage": actorCombinedCredits.media_type === "movie"
            ? { name: "movie", params: { movieId: actorCombinedCredits.id } }
            : { name: "tvShow", params: { tvShowId: actorCombinedCredits.id } }
        }).only([
          "id", "release_date", "release_year", "title", "character", "linkToPage", "media_type"
        ]).all();
    })
    .sortByDesc("release_date")
    .all();

  const images = collect(actorDetailsResponseValue.images?.profiles)
    .map(function(ActorImagesProfile: ActorImagesProfile) {
      const actorDetailsImageUrl = ActorImagesProfile?.file_path
        ? `https://image.tmdb.org/t/p/w400${ActorImagesProfile?.file_path}`
        : "https://placehold.co/400x600";

      return collect(ActorImagesProfile)
        .merge({
          "imageUrl": actorDetailsImageUrl
        })
        .only([
          "imageUrl"
        ])
        .all();
    })
    .take(CONFIG.ACTOR_IMAGES_QTY)
    .all();

  data.value = {
    actor,
    social,
    knownForMovies,
    credits,
    images
  } as unknown as ActorDetails;

  return {
    data
  };
}
