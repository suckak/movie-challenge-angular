export type Movie = {
  id: number;
  title: string;
  poster: string;
  releaseYear: string;
  genres: string[];
  tagline: string;
  overview: string;
  rating?: number;
  budget?: number;
  votes?: number;
};

export type DataMovies = {
  metaData: { pagination: { currentPage: number; totalPages: number } };
  movies: Movie[];
};

export type MovieFilters = {
  page?: number;
  genre?: number | null;
  releaseSort?: 'asc' | 'desc' | null;
};

export type Genres = Map<number, string>;
