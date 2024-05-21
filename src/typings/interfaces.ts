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
  genres: MovieGenre[];
}

export interface Movie {
  poster_path: string;
  vote_average: number;
  release_date: string;
  genres: string;
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieGenreResponse {
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

interface MovieVideo {
  results: MovieVideoKey[];
}

interface MovieVideoKey {
  key: string;
}

interface MovieCredits {
  cast: MovieCreditsCastMember[];
  crew: MovieCreditsCrewMember[];
}

interface MovieCreditsMember {
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

interface MovieCreditsCastMember extends MovieCreditsMember {
  cast_id: number;
  character: string;
  order: number;
}

interface MovieCreditsCrewMember extends MovieCreditsMember {
  department: string;
  job: string;
}

interface MovieImage {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface MovieBackdrops {
  backdrops: MovieImage[];
}

export interface MovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: MovieBelongsToCollection[];
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
  videos?: MovieVideo;
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
  videos?: MovieVideo;
  images?: MovieImage[];
}
