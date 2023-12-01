import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { mockMovieArray } from 'src/app/mocks/mockMovies';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render "Sin resultados" for a empty movie array', () => {
    const document: HTMLElement = fixture.nativeElement;
    expect(document.querySelector('h3')?.textContent).toContain(
      'Sin resultados'
    );
  });

  it('should render 3 <li>', () => {
    component.movies = mockMovieArray;
    fixture.detectChanges();
    const document: HTMLElement = fixture.nativeElement;
    expect(document.querySelectorAll('li').length).toBe(3);
  });
});
