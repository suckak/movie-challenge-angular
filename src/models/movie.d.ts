export type Movie = {
  id: number;
  title: string;
  poster: string;
  releaseYear: string;
};

export type DataMovies = {
  metaData: { pagination: { currentPage: number; totalPages: number } };
  movies: Movie[];
};

export type MovieFilters = {
  page?: number;
};
