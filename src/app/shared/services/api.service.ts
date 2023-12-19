import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { formatMovie } from 'src/utils/transformers';
import { DataMovies, MovieFilters } from 'src/models/movie';
import { CustomHttpClient } from 'src/utils/customHttpClient';
import { requestResponse } from 'src/app/interfaces/HttpRequests';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${environment.TOKEN_API}`,
  });

  constructor(private customHttp: CustomHttpClient) {}

  getMovieData({
    page = 1,
  }: MovieFilters): Observable<requestResponse<DataMovies>> {
    const queryPage = page ? `page=${page}` : '';

    const endpoint = `${environment.URL_API}/discover/movie?${queryPage}`;

    return this.customHttp.request('GET', endpoint, this.headers).pipe(
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
                ? response.data.results.map(formatMovie)
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
