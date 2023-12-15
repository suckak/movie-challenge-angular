import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoading = false;
  movies: Movie[] | null = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.apiService.getMovieData().subscribe((response) => {
      this.isLoading = response.isLoading;

      if (response.error) {
        this.toastr.error(response.error.message);
      } else {
        this.movies = response.data as Movie[];
      }
    });
  }
}
