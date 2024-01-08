import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/models/movie';
import { Location } from '@angular/common';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  movie!: Movie;

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.movie = data['movie'] as Movie;
    });
  }

  handleBack() {
    history.back();
  }
}
