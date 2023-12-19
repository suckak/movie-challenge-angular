import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataMovies } from 'src/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoading = false;
  dataMovies: DataMovies | null = {
    metaData: {
      pagination: {
        currentPage: 1,
        totalPages: 1,
      },
    },
    movies: [],
  };
  currentPage$ = new BehaviorSubject<number>(1);

  currentDataMovies$ = this.currentPage$.pipe(
    switchMap((currentPage: number) =>
      this.apiService.getMovieData({ page: currentPage })
    )
  );

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['currentPage']) {
        this.currentPage$.next(params['currentPage']);
      }
    });

    this.currentDataMovies$.subscribe((response) => {
      this.isLoading = response.isLoading;

      if (response.error) {
        this.toastr.error(response.error.message);
      } else {
        this.dataMovies = response.data;
      }
    });
  }

  onSelectedPage = (nextPage: number) => {
    this.currentPage$.next(nextPage);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { currentPage: nextPage },
      queryParamsHandling: 'merge',
    });
  };
}
