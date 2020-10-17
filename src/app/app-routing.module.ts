import { DayElevenComponent } from './resource-pages/day-eleven/day-eleven.component';
import { DayTenComponent } from './resource-pages/day-ten/day-ten.component';
import { DayNineComponent } from './resource-pages/day-nine/day-nine.component';
import { DayEightComponent } from './resource-pages/day-eight/day-eight.component';
import { DaySevenComponent } from './resource-pages/day-seven/day-seven.component';
import { DaySixComponent } from './resource-pages/day-six/day-six.component';
import { DayFiveComponent } from './resource-pages/day-five/day-five.component';
import { DayFourComponent } from './resource-pages/day-four/day-four.component';
import { MovieReviewsComponent } from './movies/movie-reviews/movie-reviews.component';
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
    path: 'movies/:id/reviews',
    component: MovieReviewsComponent
  },
  {
    path: 'reviews/:id/new',
    component: NewReviewComponent
  },
  {
    path: 'reviews/:id/edit/:reviewId',
    component: NewReviewComponent
  },
  {
    path: 'resources/day-four',
    component: DayFourComponent
  },
  {
    path: 'resources/day-five',
    component: DayFiveComponent
  },
  {
    path: 'resources/day-six',
    component: DaySixComponent
  },
  {
    path: 'resources/day-seven',
    component: DaySevenComponent
  },
  {
    path: 'resources/day-eight',
    component: DayEightComponent
  },
  {
    path: 'resources/day-nine',
    component: DayNineComponent
  },
  {
    path: 'resources/day-ten',
    component: DayTenComponent
  },
  {
    path: 'resources/day-eleven',
    component: DayElevenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
