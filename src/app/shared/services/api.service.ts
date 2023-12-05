import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, Observable, of, filter } from 'rxjs';

import { environment } from 'src/environments/environment';
import { formatMovie, formatGenre } from 'src/utils/transformers';
import { ApiResponse } from 'src/app/interfaces/apiResponse';
import { DataMovies, MovieFilters } from 'src/models/movie';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers = {
    Authorization: `Bearer ${environment.TOKEN_API}`,
  };

  constructor(private http: HttpClient) {}

  getMovieData(
    { page = 1, genre = null, releaseSort = null }: MovieFilters,
    genres: Map<number, string>
  ) {
    const endpoint = `${environment.URL_API}/discover/movie`;

    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page);
    if (genre) {
      queryParams = queryParams.append('with_genres', genre);
    }
    if (releaseSort) {
      queryParams = queryParams.append(
        'sort_by',
        releaseSort === 'asc'
          ? 'primary_release_date.asc'
          : 'primary_release_date.desc'
      );
    }

    return this.http
      .get<ApiResponse>(endpoint, {
        headers: this.headers,
        params: queryParams,
      })
      .pipe(
        map((response) => {
          return {
            metaData: {
              pagination: {
                currentPage: response.page,
                totalPages: response.total_pages,
              },
            },
            movies: response.results.map((movie) => formatMovie(movie, genres)),
          };
        }),
        catchError(
          this.handleError<DataMovies>('getMovies', {
            metaData: {
              pagination: {
                currentPage: 0,
                totalPages: 0,
              },
            },
            movies: [],
          })
        )
      );
  }

  getMovieGenreData() {
    const endpoint = `${environment.URL_API}/genre/movie/list`;
    return this.http
      .get<{ genres: { id: number; name: string }[] }>(endpoint, {
        headers: this.headers,
      })
      .pipe(
        map((response) => formatGenre(response)),
        catchError(
          this.handleError<Map<number, string>>('getGenres', new Map())
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
