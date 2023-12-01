import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { formatMovie } from 'src/utils/transformers';
import { ApiResponse } from 'src/app/interfaces/apiResponse';
import { Movie } from 'src/models/movie';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers = {
    Authorization: `Bearer ${environment.TOKEN_API}`,
  };

  constructor(private http: HttpClient) {}

  getMovieData() {
    const endpoint = `${environment.URL_API}/discover/movie`;

    return this.http.get<ApiResponse>(endpoint, { headers: this.headers }).pipe(
      map((response) => {
        return response.results.map(formatMovie);
      }),
      catchError(this.handleError<Movie[]>('getMovies', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
