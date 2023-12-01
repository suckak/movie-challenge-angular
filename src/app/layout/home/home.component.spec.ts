import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render app-loading component and not app-movie-list when isLoading is true', () => {
    const document: HTMLElement = fixture.nativeElement;
    const loadingComponent = document.querySelector('app-loading');
    const movieListComponent = document.querySelector('app-movie-list');
    expect(loadingComponent).toBeTruthy();
    expect(movieListComponent).toBeFalsy();
  });

  it('should render app-movie-list component and not app-loading when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const document: HTMLElement = fixture.nativeElement;
    const loadingComponent = document.querySelector('app-loading');
    const movieListComponent = document.querySelector('app-movie-list');
    expect(loadingComponent).toBeFalsy();
    expect(movieListComponent).toBeTruthy();
  });
});
