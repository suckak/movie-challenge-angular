import {
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { formatMovie, formatGenre } from 'src/utils/transformers';
import { DataMovies, Genres, MovieFilters } from 'src/models/movie';
import { CustomHttpClient } from 'src/utils/customHttpClient';
import { HttpClient } from '@angular/common/http';
import { requestResponse } from 'src/app/interfaces/HttpRequests';
import {
  ApiGenreResponse,
  ApiResponse,
  ApiResponseMovie,
} from 'src/app/interfaces/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${environment.TOKEN_API}`,
  });

  constructor(private customHttp: CustomHttpClient, private http: HttpClient) {}

  getMovieData(
    { page = 1, genre = null, releaseSort = null }: MovieFilters,
    genres: Genres
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
    return this.customHttp
      .request<ApiResponse>('GET', endpoint, this.headers, queryParams)
      .pipe(
        map((response) => {
          return {
            ...response,
            data: {
              metaData: {
                pagination: {
                  currentPage: response.data?.page,
                  totalPages: response.data?.total_pages,
                },
              },
              movies:
                response.data && response.error === null
                  ? response.data.results.map((movie) =>
                      formatMovie(movie, genres)
                    )
                  : [],
            } as DataMovies,
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
    return this.customHttp
      .request<ApiGenreResponse>('GET', endpoint, this.headers)
      .pipe(
        map((response) => ({
          ...response,
          data: response.data
            ? formatGenre(response.data as ApiGenreResponse)
            : new Map(),
        })),
        catchError(this.handleError<Genres>('getGenres', new Map()))
      );
  }

  getMovieDetail(id: number | string) {
    const endpoint = `${environment.URL_API}/movie/${id}`;
    return this.customHttp.request('GET', endpoint, this.headers).pipe(
      map((response) => {
        return {
          ...response,
          data: response.data
            ? formatMovie(response.data as ApiResponseMovie)
            : null,
        };
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<requestResponse<T>> => {
      console.error(operation, error);

      return of({
        isLoading: false,
        data: result as T,
        error,
      });
    };
  }
}
