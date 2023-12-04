import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
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

  it('should call getMovieData and return an array of Movies', () => {
    const movieData = {
      metaData: {
        pagination: {
          currentPage: 1,
          totalPages: 41233,
        },
      },
      movies: mockMovieArray,
    };

    service.getMovieData({ page: 1 }).subscribe((res) => {
      console.log('test', res.metaData);

      expect(res).toEqual(movieData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/discover/movie?page=1`,
    });

    req.flush(mockApiResponse);
  });

  it('should call getMovieData and return an empty array in case of an error', () => {
    service.getMovieData({ page: 1 }).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/discover/movie?page=1`,
    });

    req.flush(new Error('error'));
  });

  it('should call url paginated', () => {
    let req: TestRequest;

    service.getMovieData({ page: 2 }).subscribe((res) => {
      expect(req.request.urlWithParams).toBe(`${url}/discover/movie?page=2`);
    });

    req = httpController.expectOne({
      method: 'GET',
      url: `${url}/discover/movie?page=2`,
    });

    req.flush(mockApiResponse);
  });
});
