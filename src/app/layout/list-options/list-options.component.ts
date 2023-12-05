import { Component, Input } from '@angular/core';

import { Genres } from 'src/models/movie';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css'],
})
export class ListOptionsComponent {
  @Input() genres: Genres | undefined;
  @Input()
  onFilterSelected!: Function;
  @Input()
  onSortSelected!: Function;
  @Input()
  onClear!: Function;

  filterValue = '';
  sortValue = '';

  constructor() {}

  onFilterChange(event: Event) {
    const select = event.currentTarget as HTMLInputElement;
    this.onFilterSelected(select.value);
  }

  onSortChange(event: Event) {
    const select = event.currentTarget as HTMLInputElement;
    this.onSortSelected(select.value);
  }

  clearSelects() {
    this.filterValue = '';
    this.sortValue = '';
    this.onClear();
  }
}
