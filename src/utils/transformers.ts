import { Movie } from 'src/models/movie';

export function formatMovie(data: any): Movie {
  const { id, title, release_date, poster_path } = data;

  const imgBaseURL = 'https://image.tmdb.org/t/p/w500';

  return {
    id,
    title,
    releaseYear: release_date.split('-')[0],
    poster: `${imgBaseURL}${poster_path}`,
  };
}
