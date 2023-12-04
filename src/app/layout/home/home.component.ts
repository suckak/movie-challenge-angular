import { Component } from '@angular/core';
import { BehaviorSubject, switchMap, map, tap } from 'rxjs';
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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.currentDataMovies$.subscribe((data) => {
      this.dataMovies = data;
      this.isLoading = false;
    });
  }

  onSelectedPage = (nextPage: number) => {
    this.isLoading = true;
    this.currentPage$.next(nextPage);
  };
}
