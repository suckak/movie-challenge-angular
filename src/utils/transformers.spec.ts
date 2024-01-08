import { formatMovie } from './transformers';
import { Movie } from 'src/models/movie';
import {
  mockMovie1,
  mockApiMovie1,
  mockMovieArray,
  mockApiResponse,
} from 'src/app/mocks/mockMovies';

describe('FormatMovie', () => {
  it('should return a Movie type object from the TMDB API response', () => {
    const movie = formatMovie(mockApiMovie1);
    expect(movie).toEqual(mockMovie1);
  });

  it('should transform release_date to releaseYear ', () => {
    const movie = formatMovie(mockApiMovie1);
    expect(movie.releaseYear).toBe('2023');
  });

  it('should transform multiple API results to Movie type objects', () => {
    const movieArray = mockApiResponse.results.map(formatMovie);
    expect(movieArray).toEqual(mockMovieArray);
  });
});
