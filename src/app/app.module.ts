import { MatTabsModule } from '@angular/material/tabs';
import { Logger } from './shared/services/logger.service';
import { PrettyPrinter } from './code/pretty-printer.service';
import { CodeTabsModule } from './code/code-tabs.module';
import { CodeExampleModule } from './code/code-example.module';
import { CodeComponent } from './code/code.component';
import { CodeModule } from './code/code.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight, faUpload, faVideo, faCopy,
  faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus, faCircle
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
import { ReviewCardComponent } from './movies/review-card/review-card.component';
import { TimeAgoPipe } from './shared/pipes/time-ago.pipe';
import { NewReviewComponent } from './reviews/new-review/new-review.component';
import { MovieReviewsComponent } from './movies/movie-reviews/movie-reviews.component';
import { SingleReviewCardComponent } from './movies/single-review-card/single-review-card.component';
import { DayFourComponent } from './resource-pages/day-four/day-four.component';
import { DaySixComponent } from './resource-pages/day-six/day-six.component';
import { DaySevenComponent } from './resource-pages/day-seven/day-seven.component';
import { DayEightComponent } from './resource-pages/day-eight/day-eight.component';
import { DayNineComponent } from './resource-pages/day-nine/day-nine.component';
import { DayTenComponent } from './resource-pages/day-ten/day-ten.component';
import { DayElevenComponent } from './resource-pages/day-eleven/day-eleven.component';
import { DayFiveComponent } from './resource-pages/day-five/day-five.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import {ClipboardModule} from '@angular/cdk/clipboard';
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
    InputStarRatingComponent,
    ReviewCardComponent,
    TimeAgoPipe,
    NewReviewComponent,
    MovieReviewsComponent,
    SingleReviewCardComponent,
    DayFourComponent,
    DaySixComponent,
    DaySevenComponent,
    DayEightComponent,
    DayNineComponent,
    DayTenComponent,
    DayElevenComponent,
    DayFiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    CodeModule,
    CodeExampleModule,
    CodeTabsModule,
    NoopAnimationsModule,
    HighlightPlusModule,
    MatTabsModule,
    ClipboardModule
  ],
  providers: [
    UserService,
    MovieService,
    LocalStorageService,
    PrettyPrinter,
    Logger,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationHeaderService,
      multi: true
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faVideo, faCircle, faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight, faUpload,
      faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus, faCopy)
  }
 }

