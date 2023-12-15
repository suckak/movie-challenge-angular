import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { requestResponse } from 'src/app/interfaces/HttpRequests';
import { ApiResponse } from 'src/app/interfaces/apiResponse';
import { HttpMethod } from 'src/utils/models';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpClient {
  constructor(private http: HttpClient) {}

  request(method: HttpMethod, endpoint: string, headers: HttpHeaders) {
    return new Observable(
      (subscriber: Subscriber<requestResponse<ApiResponse>>) => {
        subscriber.next({ isLoading: true, data: null, error: null });
        this.http.request(method, endpoint, { headers }).subscribe({
          next: (data) => {
            subscriber.next({
              isLoading: false,
              data: data as ApiResponse,
              error: null,
            });
          },
          error: (error) => {
            subscriber.next({
              isLoading: false,
              data: null,
              error,
            });
          },
        });
      }
    );
  }
}
