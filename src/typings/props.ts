import type { Movie, MovieDetails } from "./interfaces";

export interface MoviesListProps {
  movies: Array<Movie> | undefined
}

export interface MovieDetailsProps {
  movieDetails: MovieDetails | undefined
}

export interface MoviesListItemProps {
  movie: Movie | undefined
}


