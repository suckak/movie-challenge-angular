import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataMovies, MovieFilters } from 'src/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoading = true;
  dataMovies: DataMovies = {
    metaData: {
      pagination: {
        currentPage: 1,
        totalPages: 1,
      },
    },
    movies: [],
  };
  currentFilters$ = new BehaviorSubject<MovieFilters>({});
  genres = new Map();

  currentDataMovies$ = this.currentFilters$.pipe(
    switchMap((filters: MovieFilters) =>
      this.apiService.getMovieData(
        {
          page: filters.page,
          genre: filters.genre,
          releaseSort: filters.releaseSort,
        },
        this.genres
      )
    )
  );

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.apiService.getMovieGenreData().subscribe((res) => {
      this.genres = res;
      this.activatedRoute.queryParams
        .subscribe((params) => {
          if (params['currentPage']) {
            this.currentFilters$.next({
              ...this.currentFilters$.getValue(),
              page: params['currentPage'],
            });
          }
        })
        .unsubscribe();

      this.currentDataMovies$.subscribe((data) => {
        this.dataMovies = data;
        this.isLoading = false;
      });
    });
  }

  onSelectedPage = (nextPage: number) => {
    this.isLoading = true;
    this.currentFilters$.next({
      ...this.currentFilters$.getValue(),
      page: nextPage,
    });

    this.updateURL(nextPage);
  };

  onSelectedFilter = (genre: number) => {
    this.isLoading = true;
    this.currentFilters$.next({
      ...this.currentFilters$.getValue(),
      genre,
    });
  };

  onSelectedSort = (sort: 'asc' | 'desc') => {
    this.isLoading = true;
    this.currentFilters$.next({
      ...this.currentFilters$.getValue(),
      releaseSort: sort,
    });
  };

  clearFilters = () => {
    this.isLoading = true;
    this.currentFilters$.next({
      page: 1,
      releaseSort: null,
      genre: null,
    });
    this.updateURL(1);
  };

  updateURL(page: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { currentPage: page },
      queryParamsHandling: 'merge',
    });
  }
}
