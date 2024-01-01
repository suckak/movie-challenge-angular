import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataMovies, Genres, MovieFilters } from 'src/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoading = true;
  dataMovies: DataMovies | null = {
    metaData: {
      pagination: {
        currentPage: 1,
        totalPages: 1,
      },
    },
    movies: [],
  };
  genres: Genres = new Map();
  currentFilters$ = new BehaviorSubject<MovieFilters>({});

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
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.apiService.getMovieGenreData().subscribe((res) => {
      if (!res.isLoading && res.error === null) {
        this.genres = res.data as Genres;
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

        this.currentDataMovies$.subscribe((response) => {
          this.isLoading = response.isLoading;

          if (response.error) {
            this.toastr.error(response.error.message);
          } else {
            this.dataMovies = response.data;
          }
        });
      }
    });
  }

  onSelectedPage = (nextPage: number) => {
    this.currentFilters$.next({
      ...this.currentFilters$.getValue(),
      page: nextPage,
    });
    this.updateURL(nextPage);
  };

  onSelectedFilter = (genre: number) => {
    this.currentFilters$.next({
      ...this.currentFilters$.getValue(),
      genre,
    });
  };

  onSelectedSort = (sort: 'asc' | 'desc') => {
    this.currentFilters$.next({
      ...this.currentFilters$.getValue(),
      releaseSort: sort,
    });
  };

  clearFilters = () => {
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
