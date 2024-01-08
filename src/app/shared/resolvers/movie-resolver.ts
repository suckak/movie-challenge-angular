import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Observable, filter, of, take } from 'rxjs';
import { Movie } from 'src/models/movie';
import { ApiService } from '../services/api.service';
export const MovieResolver: ResolveFn<Movie> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  apiService: ApiService = inject(ApiService),
  router: Router = inject(Router)
): Observable<Movie> => {
  const id = route.paramMap.get('id');

  if (id) {
    return apiService.getMovieDetailResolver(id);
  }
  router.navigateByUrl('/');
  return of();
};
