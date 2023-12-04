import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, Observable, of, filter } from 'rxjs';

import { environment } from 'src/environments/environment';
import { formatMovie } from 'src/utils/transformers';
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

  getMovieData({ page = 1 }: MovieFilters) {
    const queryPage = page ? `page=${page}` : '';

    const endpoint = `${environment.URL_API}/discover/movie?${queryPage}`;

    return this.http.get<ApiResponse>(endpoint, { headers: this.headers }).pipe(
      map((response) => {
        return {
          metaData: {
            pagination: {
              currentPage: response.page,
              totalPages: response.total_pages,
            },
          },
          movies: response.results.map(formatMovie),
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
