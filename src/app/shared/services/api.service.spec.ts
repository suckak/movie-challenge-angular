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

  it('should call getMovieData and return an array of Movies', () => {
    service.getMovieData().subscribe((res) => {
      expect(res).toEqual(mockMovieArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/discover/movie`,
    });

    req.flush(mockApiResponse);
  });

  it('should call getMovieData and return an empty array in case of an error', () => {
    service.getMovieData().subscribe((res) => {
      expect(res).toEqual([]);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/discover/movie`,
    });

    req.flush(new Error('error'));
  });
});
