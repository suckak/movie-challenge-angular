import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { MovieDetailComponent } from './layout/movie-detail/movie-detail.component';
import { MovieResolver } from './shared/resolvers/movie-resolver';
import { NotFoundComponent } from './layout/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
    resolve: { movie: MovieResolver },
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
