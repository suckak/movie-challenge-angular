import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoading = true;
  movies: Movie[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getMovieData().subscribe((data) => {
      this.movies = data;
      this.isLoading = false;
    });
  }
}
