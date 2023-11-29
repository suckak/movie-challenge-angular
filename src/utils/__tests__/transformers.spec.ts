import { formatMovie } from '../transformers';

describe('FormatMovie', () => {
  it('create a Movie type object from the TMDB API response', () => {
    const data = {
      adult: false,
      backdrop_path: '/fRX6K89BYOePCaEibH8Go0zp114.jpg',
      belongs_to_collection: null,
      budget: 0,
      genres: [
        {
          id: 53,
          name: 'Thriller',
        },
        {
          id: 35,
          name: 'Comedy',
        },
      ],
      homepage: '',
      id: 25634,
      imdb_id: 'tt0034740',
      original_language: 'en',
      original_title: 'Fly-By-Night',
      overview:
        "Young intern Jeff Burton, impulsively offers a lift to an odd-looking gentlemen. It soon turns out that Jeff's passenger is an inventor has just escaped from a shady sanitarium, where he has been held prisoner by Nazi spies.",
      popularity: 2.26,
      poster_path: '/2CykY9QEiqO9p9GIfiiz1BIrfCZ.jpg',
      production_companies: [
        {
          id: 4,
          logo_path: '/gz66EfNoYPqHTYI4q9UEN4CbHRc.png',
          name: 'Paramount',
          origin_country: 'US',
        },
      ],
      production_countries: [
        {
          iso_3166_1: 'US',
          name: 'United States of America',
        },
      ],
      release_date: '1942-01-19',
      revenue: 0,
      runtime: 74,
      spoken_languages: [
        {
          english_name: 'English',
          iso_639_1: 'en',
          name: 'English',
        },
      ],
      status: 'Released',
      tagline: '',
      title: 'Fly-By-Night',
      video: false,
      vote_average: 6.5,
      vote_count: 4,
    };
    const movie = formatMovie(data);
    console.log(movie);
    expect(movie.releaseYear).toBe('1942');
  });
});
