import { Movie } from 'src/models/movie';

const mockMovie1: Movie = {
  id: 901362,
  title: 'Trolls Band Together',
  releaseYear: '2023',
  poster: 'https://image.tmdb.org/t/p/w500/sEaLO9s7CIN3fjz8R3Qksum44en.jpg',
};

const mockApiMovie1 = {
  adult: false,
  backdrop_path: '/xgGGinKRL8xeRkaAR9RMbtyk60y.jpg',
  genre_ids: [16, 10751, 10402, 14, 35],
  id: 901362,
  original_language: 'en',
  original_title: 'Trolls Band Together',
  overview:
    'When Branch’s brother, Floyd, is kidnapped for his musical talents by a pair of nefarious pop-star villains, Branch and Poppy embark on a harrowing and emotional journey to reunite the other brothers and rescue Floyd from a fate even worse than pop-culture obscurity.',
  popularity: 1413.675,
  poster_path: '/sEaLO9s7CIN3fjz8R3Qksum44en.jpg',
  release_date: '2023-10-12',
  title: 'Trolls Band Together',
  video: false,
  vote_average: 7.2,
  vote_count: 197,
};

const mockMovie2: Movie = {
  id: 670292,
  title: 'The Creator',
  releaseYear: '2023',
  poster: 'https://image.tmdb.org/t/p/w500/vBZ0qvaRxqEhZwl6LWmruJqWE8Z.jpg',
};

const mockApiMovie2 = {
  adult: false,
  backdrop_path: '/kjQBrc00fB2RjHZB3PGR4w9ibpz.jpg',
  genre_ids: [878, 28, 53],
  id: 670292,
  original_language: 'en',
  original_title: 'The Creator',
  overview:
    'Amid a future war between the human race and the forces of artificial intelligence, a hardened ex-special forces agent grieving the disappearance of his wife, is recruited to hunt down and kill the Creator, the elusive architect of advanced AI who has developed a mysterious weapon with the power to end the war—and mankind itself.',
  popularity: 954.725,
  poster_path: '/vBZ0qvaRxqEhZwl6LWmruJqWE8Z.jpg',
  release_date: '2023-09-27',
  title: 'The Creator',
  video: false,
  vote_average: 7.1,
  vote_count: 1194,
};

const mockMovie3: Movie = {
  id: 872906,
  title: 'Jawan',
  releaseYear: '2023',
  poster: 'https://image.tmdb.org/t/p/w500/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg',
};

const mockApiMovie3 = {
  adult: false,
  backdrop_path: '/28er4p7B5zMSxUDQKPF1hBsgnys.jpg',
  genre_ids: [28, 12, 53],
  id: 872906,
  original_language: 'hi',
  original_title: 'जवान',
  overview:
    'An emotional journey of a prison warden, driven by a personal vendetta while keeping up to a promise made years ago, recruits inmates to commit outrageous crimes that shed light on corruption and injustice, in an attempt to get even with his past,  and that leads him to an unexpected reunion.',
  popularity: 569.971,
  poster_path: '/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg',
  release_date: '2023-09-07',
  title: 'Jawan',
  video: false,
  vote_average: 7.1,
  vote_count: 120,
};

const mockMovieArray: Movie[] = [mockMovie1, mockMovie2, mockMovie3];

const mockApiResponse = {
  page: 1,
  results: [mockApiMovie1, mockApiMovie2, mockApiMovie3],
  total_pages: 41233,
  total_results: 824656,
};

export {
  mockMovie1,
  mockMovie2,
  mockMovie3,
  mockApiMovie1,
  mockApiMovie2,
  mockApiMovie3,
  mockMovieArray,
  mockApiResponse,
};
