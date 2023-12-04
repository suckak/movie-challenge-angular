import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input()
  onSelectPage!: Function;
  @Input()
  currentPage!: number;
  @Input()
  totalPages!: number;
  pages: number[] = [];

  constructor() {}

  ngOnChanges() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1).slice(
      this.currentPage - 5 > 1 ? this.currentPage - 5 : 0,
      this.currentPage + 5
    );
  }
}
