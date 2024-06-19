import type { DetailsRoute, MultiSearchResponseResult } from "./types";

// ===============================================================================================
// MOVIES
// ===============================================================================================

export interface MovieResponse {
  page: number;
  results: MovieResponseResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponseResult {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  poster_path: string;
  vote_average: string;
  release_date: string;
  genres: string;
  id: number;
  title: string;
  overview: string;
  genre_ids?: number[];
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieGenresResponse {
  genres: MovieGenre[];
}

interface MovieProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface MovieProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface MovieSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface MovieBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface MovieVideoResults {
  results: MovieVideo[];
}

interface MovieVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface MovieCredits {
  cast: MovieCreditsCastMember[];
  crew: MovieCreditsCrewMember[];
}

export interface MovieCreditsMember {
  id: number;
  name: string;
  profile_path: string;
  original_name: string;
  popularity: number;
  adult: boolean;
  credit_id: string;
  gender: number;
  known_for_department: string;
}

export interface MovieCreditsCastMember extends MovieCreditsMember {
  cast_id: number;
  character: string;
  order: number;
}

export interface MovieCreditsCrewMember extends MovieCreditsMember {
  department: string;
  job: string;
}

export interface MovieImage {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieBackdrops {
  backdrops: MovieImage[];
  logos: MovieImage[];
  posters: MovieImage[];
}

export interface MovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: MovieBelongsToCollection;
  budget?: number;
  genres: MovieGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: MovieProductionCompany[];
  production_countries?: MovieProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: MovieSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits?: MovieCredits;
  videos?: MovieVideoResults;
  images?: MovieBackdrops;
}

export interface MovieDetails {
  poster_path: string;
  vote_average: string;
  release_date: string;
  genres: string;
  crew: MovieCreditsCrewMember[];
  cast: MovieCreditsCastMember[];
  id: number;
  title: string;
  overview: string;
  credits?: MovieCredits;
  videos?: MovieVideoResults;
  images?: MovieImage[];
}

export interface AppErrorInfo {
  message: string;
  originalError: Error;
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
}

// ===============================================================================================
// TV SHOW
// ===============================================================================================

export interface TvShowResponse {
  page: number;
  results: TvShowResponseResult[];
  total_pages: number;
  total_results: number;
}

export interface TvShowResponseResult {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  popularity: number;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface TvShow {
  poster_path: string;
  vote_average: string;
  first_air_date: string;
  genres: string;
  id: number;
  name: string;
  overview: string;
  genre_ids?: number[];
}

export interface TvShowGenre {
  id: number;
  name: string;
}

export interface TvShowGenresResponse {
  genres: TvShowGenre[];
}

interface TvShowProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface TvShowProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface TvShowSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface TvShowBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface TvShowVideoResults {
  results: TvShowVideo[];
}

interface TvShowVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface TvShowCredits {
  cast: TvShowCreditsCastMember[];
  crew: TvShowCreditsCrewMember[];
}

export interface TvShowCreditsMember {
  id: number;
  name: string;
  profile_path: string;
  original_name: string;
  popularity: number;
  adult: boolean;
  credit_id: string;
  gender: number;
  known_for_department: string;
}

export interface TvShowCreditsCastMember extends MovieCreditsMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

export interface TvShowCreditsCrewMember extends MovieCreditsMember {
  department: string;
  job: string;
}

export interface TvShowImage {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface TvShowBackdrops {
  backdrops: TvShowImage[];
  logos: TvShowImage[];
  posters: TvShowImage[];
}

export interface TvShowDetailsResponse {
  created_by?: TvShowDetailsCreatedBy[],
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: TvShowBelongsToCollection;
  budget?: number;
  genres: TvShowGenre[];
  homepage: string;
  id: number;
  imdb_id?: string;
  origin_country: string[];
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: TvShowProductionCompany[];
  production_countries?: TvShowProductionCountry[];
  first_air_date: string;
  revenue?: number;
  runtime?: number;
  spoken_languages: TvShowSpokenLanguage[];
  status: string;
  tagline: string;
  name: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  credits?: TvShowCredits;
  videos?: TvShowVideoResults;
  images?: TvShowBackdrops;
  in_production?: boolean;
  episode_run_time?: unknown[],
  languages?: unknown[],
  last_air_date?: string,
  last_episode_to_air?: object | null,
  next_episode_to_air?: object | null,
  networks?: unknown[],
  number_of_episodes?: number;
  number_of_seasons?: number;
  original_name?: string;
  seasons?: unknown[];
  type?: string;
}

export interface TvShowDetails {
  poster_path: string;
  vote_average: string;
  first_air_date: string;
  genres: string;
  crew?: TvShowCreditsCrewMember[];
  cast?: TvShowCreditsCastMember[];
  id: number;
  name: string;
  overview: string;
  credits?: TvShowCredits;
  videos?: TvShowVideoResults;
  images?: TvShowImage[];
  created_by?: TvShowDetailsCreatedBy[],
}

export interface TvShowDetailsCreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  character?: string;
  adult?: boolean;
  known_for_department?: string;
  popularity?: number;
  profile_path?: string;
  order?: number;
}


// ===============================================================================================
// ACTORS
// ===============================================================================================

export interface ActorResponse {
  page: number;
  results: ActorResponseResult[];
  total_pages: number;
  total_results: number;
}

export interface ActorResponseResult {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: ActorKnownFor[];
}

export interface ActorKnownFor {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string;
  known_for: string;
}

export interface ActorDetailsResponse {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  images: ActorImages;
  external_ids: ActorSocialMediaIDs;
  combined_credits: CombinedCredits
}

interface ActorImages {
  profiles: ActorProfilesImage[];
}

interface ActorProfilesImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ActorSocialMediaIDs {
  freebase_mid: string;
  freebase_id: string;
  imdb_id: string;
  tvrage_id: number;
  wikidata_id: string;
  facebook_id: string | null;
  instagram_id: string | null;
  tiktok_id: string | null;
  twitter_id: string;
  youtube_id: string | null;
}

export interface CombinedCredits {
  cast: CombinedCreditsMovie[];
  crew: CombinedCreditsMovie[];
}

export interface CombinedCreditsMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date?: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: "movie";
}

export interface ActorDetails {
  actor: ActorDetailsInfo;
  social: ActorDetailsSocial;
  knownForMovies: ActorDetailsMovies[];
  credits: ActorDetailsCredits[];
  images: ActorProfilesImage[];
}

export interface ActorDetailsInfo {
  birthday: string;
  age: number;
  profile_path: string;
  name: string;
  id: number;
  homepage: string;
  place_of_birth: string;
  biography: string;
}

export interface ActorDetailsSocial {
  facebook: string;
  instagram: string;
  twitter: string;
}

export interface ActorDetailsMovies {
  id: string;
  title: string;
  poster_path: string;
  media_type: string;
  linkToPage: DetailsRoute;
}

export interface ActorDetailsCredits {
  title: string;
  release_date: string;
  release_year: string;
  character: string;
  linkToPage: DetailsRoute;
}

// ===============================================================================================
// MULTI SEARCH
// ===============================================================================================

export interface MultiSearchResponse {
  page: number;
  results: MultiSearchResponseResult[];
  total_pages: number;
  total_results: number;
}

export interface MultiSearchMovieResponseResult extends MovieResponseResult {
  media_type: "movie";
}

export interface MultiSearchTvShowResponseResult extends TvShowResponseResult {
  media_type: "tv";
}

export interface MultiSearchActorResponseResult extends ActorResponseResult {
  media_type: "person";
}
