import { Movie } from 'src/models/movie';

export function formatMovie(data: any, genres?: Map<number, string>): Movie {
  const { id, title, release_date, poster_path, genre_ids } = data;

  const imgBaseURL = 'https://image.tmdb.org/t/p/w300';
  const genresNames = genres
    ? genre_ids.map((id: number) => genres.get(id))
    : data.genres.map((genre: { name: any }) => genre.name);

  return {
    id,
    title,
    releaseYear: release_date.split('-')[0],
    poster: `${imgBaseURL}${poster_path}`,
    genres: genresNames,
  };
}

export function formatGenre(data: {
  genres: { id: number; name: string }[];
}): Map<number, string> {
  return new Map(data.genres.map((genre) => [genre.id, genre.name]));
}
