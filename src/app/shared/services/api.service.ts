import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { formatMovie } from 'src/utils/transformers';
import { ApiResponse } from 'src/app/interfaces/apiResponse';

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
    console.log(endpoint);

    return this.http.get<ApiResponse>(endpoint, { headers: this.headers }).pipe(
      map((response) => {
        return response.results.map(formatMovie);
      })
    );
  }
}
