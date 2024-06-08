import type { Movie, MovieDetails, TvShow, TvShowDetails } from "./interfaces";

export interface MoviesListProps {
  movies: Array<Movie> | undefined
}

export interface MovieDetailsProps {
  movieDetails: MovieDetails | undefined
}

export interface MoviesListItemProps {
  movie: Movie | undefined
}

export interface TvShowsListProps {
  tvShows: Array<TvShow> | undefined
}

export interface TvShowDetailsProps {
  tvShowDetails: TvShowDetails | undefined
}

export interface TvShowsListItemProps {
  tvShow: TvShow | undefined
}



