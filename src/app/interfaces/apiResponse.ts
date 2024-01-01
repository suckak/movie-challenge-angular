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
  genre_ids: number[];
}

export interface ApiGenreResponse {
  genres: { id: number; name: string }[];
}
