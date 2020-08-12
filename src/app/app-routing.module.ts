import { NewReviewComponent } from './reviews/new-review/new-review.component';
import { SingleMovieComponent } from './movies/single-movie/single-movie.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewMovieComponent } from './movies/new-movie/new-movie.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'movies/new',
    component: NewMovieComponent
  },
  {
    path: 'movies/:id',
    component: SingleMovieComponent
  },
  {
    path: 'reviews/:id/new',
    component: NewReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
