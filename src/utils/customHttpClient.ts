import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  request<T>(
    method: HttpMethod,
    endpoint: string,
    headers: HttpHeaders,
    params?: HttpParams
  ) {
    return new Observable((subscriber: Subscriber<requestResponse<T>>) => {
      subscriber.next({ isLoading: true, data: null, error: null });
      this.http.request(method, endpoint, { headers, params }).subscribe({
        next: (data) => {
          subscriber.next({
            isLoading: false,
            data: data as T,
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
    });
  }
}
