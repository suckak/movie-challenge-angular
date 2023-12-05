import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataMovies } from 'src/models/movie';

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
  currentPage$ = new BehaviorSubject<number>(1);

  currentDataMovies$ = this.currentPage$.pipe(
    switchMap((currentPage: number) =>
      this.apiService.getMovieData({ page: currentPage })
    )
  );

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.activatedRoute.queryParams, 'params');
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['currentPage']) {
        this.currentPage$.next(params['currentPage']);
      }
    });

    this.currentDataMovies$.subscribe((data) => {
      this.dataMovies = data;
      this.isLoading = false;
    });
  }

  onSelectedPage = (nextPage: number) => {
    this.isLoading = true;
    this.currentPage$.next(nextPage);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { currentPage: nextPage },
      queryParamsHandling: 'merge',
    });
  };
}
