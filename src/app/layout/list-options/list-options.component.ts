import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Genres } from 'src/models/movie';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css'],
})
export class ListOptionsComponent {
  @Input() genres: Genres | undefined;
  @Output()
  genre = new EventEmitter<number>();
  @Output()
  sort = new EventEmitter<'asc' | 'desc'>();
  @Output()
  clear = new EventEmitter<Event>();

  sortTypes = ['asc', 'desc'];

  filterValue = '';
  sortValue = '';

  constructor() {}

  onFilterChange(event: Event) {
    const select = event.currentTarget as HTMLInputElement;
    this.genre.emit(parseInt(select.value));
    console.log(select.value);

    this.filterValue = select.value;
  }

  onSortChange(event: Event) {
    const select = event.currentTarget as HTMLInputElement;
    this.sort.emit(select.value as 'asc' | 'desc');
    this.sortValue = select.value;
  }

  onClear(event: Event) {
    this.filterValue = '';
    this.sortValue = '';
    this.clear.emit(event);
  }
}
