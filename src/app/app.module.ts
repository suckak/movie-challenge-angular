import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgOptimizedImage } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { MovieListComponent } from './layout/movie-list/movie-list.component';
import { MovieListItemComponent } from './layout/movie-list-item/movie-list-item.component';
import { LoadingComponent } from './layout/loading/loading.component';
import { PaginationComponent } from './layout/pagination/pagination.component';
import { ListOptionsComponent } from './layout/list-options/list-options.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MovieListComponent,
    MovieListComponent,
    MovieListItemComponent,
    LoadingComponent,
    PaginationComponent,
    ListOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
