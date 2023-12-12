import { Movie } from 'src/models/movie';
import { ApiResponseMovie } from 'src/app/interfaces/apiResponse';

export function formatMovie(data: ApiResponseMovie): Movie {
  const { id, title, release_date, poster_path } = data;

  const imgBaseURL = 'https://image.tmdb.org/t/p/w500';

  return {
    id,
    title,
    releaseYear: release_date.split('-')[0] || 'N/A',
    poster: `${imgBaseURL}${poster_path}`,
  };
}
