import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getMovieDetail(123).subscribe((data) => {
      console.log(data);
    });
  }
}
