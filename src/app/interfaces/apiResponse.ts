export interface ApiResponse {
  page: number;
  results: ApiResponseMovie[];
  total_pages: number;
  total_results: number;
}

export interface ApiResponseMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  genres: { id: number; name: string }[];
  genre_ids: number[];
  tagline: string;
  overview: string;
  vote_average?: number;
  budget?: number;
  vote_count?: number;
}

export interface ApiGenreResponse {
  genres: { id: number; name: string }[];
}
