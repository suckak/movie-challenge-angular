import { Genres, Movie } from 'src/models/movie';
import { ApiResponseMovie } from 'src/app/interfaces/apiResponse';

export function formatMovie(data: ApiResponseMovie, genres?: Genres): Movie {
  const { id, title, release_date, poster_path, genre_ids, tagline, overview } =
    data;

  const imgBaseURL = 'https://image.tmdb.org/t/p/w500';

  const genresNames = genres
    ? genre_ids.map((id: number) => genres.get(id))
    : data.genres.map((genre: { name: any }) => genre.name);

  return {
    id,
    title,
    releaseYear: release_date.split('-')[0] || 'N/A',
    poster: `${imgBaseURL}${poster_path}`,
    genres: genresNames,
    tagline,
    overview,
  };
}

export function formatGenre(data: {
  genres: { id: number; name: string }[];
}): Genres {
  return new Map(data.genres.map((genre) => [genre.id, genre.name]));
}
