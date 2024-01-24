import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/models/movie';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  isLoading = true;
  movie!: Movie | null;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (!movieId) {
        this.router.navigate(['/404']);
      }
      this.apiService
        .getMovieDetail(movieId as string)
        .subscribe((response) => {
          if (response.error) {
            this.toastr.error(response.error.message);
            this.router.navigate(['/404']);
          } else {
            this.movie = response.data;
          }
          this.isLoading = response.isLoading;
        });
    });
  }

  handleBack() {
    history.back();
  }
}
