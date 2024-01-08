import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { mockMovieArray, mockApiResponse } from 'src/app/mocks/mockMovies';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;
  let url = environment.URL_API;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMovieData and return an array of Movies in data', () => {
    service.getMovieData({ page: 1 }).subscribe((res) => {
      if (!res.isLoading) {
        expect(res.data?.movies).toEqual(mockMovieArray);
        expect(res.error).toBeNull();
      }
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/discover/movie?page=1`,
    });

    req.flush(mockApiResponse);
  });

  it('should call getMovieData and return an error and empty array in case of an error', () => {
    service.getMovieData({ page: 1 }).subscribe((res) => {
      if (!res.isLoading) {
        expect(res.data?.movies).toEqual([]);
        expect(res.error).toBeDefined();
      }
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/discover/movie?page=1`,
    });

    req.flush(new Error('error'));
  });
});
