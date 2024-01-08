import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListItemComponent } from './movie-list-item.component';
import { mockMovie1 } from 'src/app/mocks/mockMovies';

describe('MovieListItemComponent', () => {
  let component: MovieListItemComponent;
  let fixture: ComponentFixture<MovieListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListItemComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie1;
    fixture.detectChanges();
  });

  it('should render movie title, releaseYear and image poster', () => {
    const document: HTMLElement = fixture.nativeElement;
    const img = document.querySelector('img');
    const texts = document.querySelectorAll('dt');

    expect(img?.src).toBe(mockMovie1.poster);
    expect(texts[0].textContent).toContain(mockMovie1.title);
    expect(texts[1].textContent).toContain(mockMovie1.releaseYear);
  });
});
