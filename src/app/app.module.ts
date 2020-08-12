import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight, faUpload,
  faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './shared/services/user.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { AuthorizationHeaderService } from './shared/services/authorization-header.service';
import { MovieService } from './shared/services/movie.service';
import { MovieCardComponent } from './home/movie-card/movie-card.component';
import { NewMovieComponent } from './movies/new-movie/new-movie.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SignupComponent } from './signup/signup.component';
import { SingleMovieComponent } from './movies/single-movie/single-movie.component';
import { InputStarRatingComponent } from './movies/input-star-rating/input-star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    MovieCardComponent,
    NewMovieComponent,
    SignupComponent,
    SingleMovieComponent,
    InputStarRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule
  ],
  providers: [
    UserService,
    MovieService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationHeaderService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight, faUpload,
      faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus)
  }
 }

