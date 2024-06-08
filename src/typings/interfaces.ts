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
  // genres: MovieGenre[];
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
  original_title: string;
  overview: string;
  poster_path: string;
  popularity: number;
  first_air_date: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  // genres: MovieGenre[];
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
  cast_id: number;
  character: string;
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
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: TvShowBelongsToCollection;
  budget?: number;
  genres: TvShowGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: TvShowProductionCompany[];
  production_countries?: TvShowProductionCountry[];
  first_air_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TvShowSpokenLanguage[];
  status: string;
  tagline: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits?: TvShowCredits;
  videos?: TvShowVideoResults;
  images?: TvShowBackdrops;
}

export interface TvShowDetails {
  poster_path: string;
  vote_average: string;
  first_air_date: string;
  genres: string;
  crew: TvShowCreditsCrewMember[];
  cast: TvShowCreditsCastMember[];
  id: number;
  name: string;
  overview: string;
  credits?: TvShowCredits;
  videos?: TvShowVideoResults;
  images?: TvShowImage[];
}
