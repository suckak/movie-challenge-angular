import { Component, Input } from '@angular/core';
import { Movie } from 'src/models/movie';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.css'],
})
export class MovieListItemComponent {
  @Input() movie: Movie | undefined;
  constructor() {}
}
