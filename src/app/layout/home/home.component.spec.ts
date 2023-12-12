import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { LoadingComponent } from '../loading/loading.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { defer } from 'rxjs';
import { mockMovieArray } from 'src/app/mocks/mockMovies';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';

class MockApiService {
  getMovieData() {
    console.log('Mock Service');

    //return of(mockMovieArray).pipe(delay(100));
    return defer(() => Promise.resolve(mockMovieArray));
  }
}

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        MovieListComponent,
        LoadingComponent,
        MovieListItemComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ApiService,
          useClass: MockApiService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  it('should render app-loading component and not app-movie-list while service is pending', () => {
    const document: HTMLElement = fixture.nativeElement;
    const loadingComponent = document.querySelector('app-loading');
    const movieListComponent = document.querySelector('app-movie-list');

    expect(loadingComponent).toBeDefined();
    expect(movieListComponent).toBeNull();
  });

  it('should render app-movie-list component and not app-loading when service response', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    const document: HTMLElement = fixture.nativeElement;
    const loadingComponent = document.querySelector('app-loading');
    const movieListComponent = document.querySelector('app-movie-list');

    expect(loadingComponent).toBeNull();
    expect(movieListComponent).toBeDefined();
  }));
});
