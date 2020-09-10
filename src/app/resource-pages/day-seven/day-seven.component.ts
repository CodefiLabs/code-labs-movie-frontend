import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-seven',
  templateUrl: './day-seven.component.html',
  styleUrls: ['./day-seven.component.scss']
})
export class DaySevenComponent implements OnInit {

  reviewModel = `
  export class Review {
    id: number
    body: string
    title: string
    movie_id: number
    user_id: number
    user_nickname: string
    rating: number
    created_at: string
    updated_at: string
    constructor({
        id = 0,
        body = '',
        title = '',
        movie_id = 0,
        user_id = 0,
        user_nickname = '',
        rating = 5,
        created_at = '',
        updated_at = '',
        ...rest
    }) {
        Object.assign(this, rest)
        this.id = id
        this.body = body
        this.title = title
        this.movie_id = movie_id
        this.user_id = user_id
        this.user_nickname = user_nickname
        this.rating = rating
        this.created_at = created_at
        this.updated_at = updated_at
    }

}

  `

  singleMovieHtml = `
  <div class="container mb-3">
  <div class="row mt-5">
      <div class="col-12 mt-5 mb-5">
          <div *ngIf="movie" class="card p-4">
              <div class="d-inline-flex w-100">
                  <div class="flex">
                      <h5 class="movie-title">{{movie.title}}</h5>
                      <h6 class="release-date">Released:<span class="rd-bold ml-2">{{movie.release_date | date: 'MMMM dd, yyyy'}}</span></h6>
                      <h6 class="movie-description mt-4">{{movie.description}}</h6>
                      <div class="d-inline-flex w-100 mt-4">
                          <p class="flex movie-rating">Rating: <span class="mr-bold ml-2">{{movie.parental_rating}}</span></p>
                          <p class="flex movie-duration ml-5">Duration: <span class="md-bold ml-2">{{movie.duration}}</span></p>
                      </div>
                  </div>
                  <div class="ml-auto flex movie-img">
                      <img class="img img-fluid" [src]="movieImg" (error)="setDefaultPic()">
                  </div>
              </div>
              <div class="row">
                  <div class="col-12 mt-4 mb-4">
                      <p class="desc-text">Cast</p>
                      <hr>
                      <p class="movie-text">{{movie.cast}}</p>
                  </div>
                  <div class="col-12 mt-4 mb-4">
                      <p class="desc-text">Director</p>
                      <hr>
                      <p class="movie-text">{{movie.director}}</p>
                  </div>
                  <div class="col-12 mt-4 mb-4">
                      <p class="desc-text">Total Gross</p>
                      <hr>
                      <p class="movie-text">{{movie.total_gross | currency}}</p>
                  </div>
                  <div class="col-12 mt-4 mb-4">
                      <p class="desc-text">Average Rating</p>
                      <hr>
                      <p>Placeholder for our Star Rating Component</p>
                  </div>
                  <div class="col-12 mt-4 mb-4">
                      <p class="desc-text">Reviews</p>
                      <p>Placeholder for our movie review card!!!</p>
                  </div>
              </div>
          </div>
      </div>
      <div *ngIf="currentUser" class="col-12 mb-5 d-inline-flex">
          <div class="flex">
              <button class="btn btn-primary" (click)="routeToWriteReview()">Write Review
                  <fa-icon [icon]="['fas', 'star']" size="sm" class="ml-2 text-white"></fa-icon>
              </button>
          </div>
          <div *ngIf="currentUser.id === movie.user_id" class="flex ml-auto">
              <div class="w-100 d-inline-flex">
                  <div class="flex">
                      <button class="btn btn-outline-primary" (click)="editMovie()">Edit Movie
                          <fa-icon [icon]="['fas', 'pen']" size="sm" class="ml-2"></fa-icon>
                      </button>
                  </div>
                  <div class="flex ml-4">
                      <button class="btn btn-outline-primary" (click)="deleteMovie()">Delete Movie
                          <fa-icon [icon]="['fas', 'trash-alt']" size="sm" class="ml-2"></fa-icon>
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>


  `

  singleMovieScss = `
  .movie-img {
    margin-top: -50px;
}
.movie-title {
    font-family: 'Bitter';
    font-weight: bold;
    font-size: 38px;
    color: #FF4436;
}

.release-date, .movie-rating, .movie-duration {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 16px;
    color: #CCCCCC;
    span {
        color: #777777;
    }
}

.movie-description {
    font-family: 'Raleway';
    font-weight: 500;
    font-size: 18px;
    color: #777777;
}

.desc-text {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 24px;
    color: #CCCCCC;
}

.movie-text {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 16px;
    color: #777777;
}
  `

  reviewCardHtml = `
  <div *ngIf="reviews" class="row">
    <div *ngIf="firstReview" class="col-12">
        <div class="row">
            <div class="col-12 d-inline-flex">
                <div class="flex">
                    <app-input-star-rating [rating]="firstReview.rating" [starCount]="5" [padding]="0" [size]="24"></app-input-star-rating>
                </div>
                <div class="flex ml-2">
                    <p class="review-author mt-2">by {{firstReview.user_nickname}}<span class="ml-2">{{firstReview.updated_at | timeAgo}}</span></p>
                </div>
            </div>
            <div class="col-12 mt-4 mb-4">
                <p class="review-body">{{firstReview.body}}</p>
            </div>
            <div class="col-12">
                <p class="read-all-reviews">Read all <a (click)="routeToAllReviews()">{{reviewCountString}}</a></p>
            </div>
        </div>
    </div>
</div>
<div *ngIf="!reviews" class="row">
    <div class="col-12 text-center">
        <h1>There are no reviews for this movie yet!</h1>
    </div>
</div>

  `

  reviewCardScss = `
  h1 {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 24px;
    color: #777777;
}

.review-author {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 16px;
    color: #777777;
    span {
        color: #CCCCCC;
    }
}

.review-body {
    font-family: 'Raleway';
    font-weight: 500;
    font-size: 16px;
    color: #777777;
}

.read-all-reviews {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 16px;
    color: #777777;
    a {
        text-decoration: underline;
        color: #FF4436;
    }
}
  `

  timeAgoPipe = `
  import { Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer: number;
  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) { }
  transform(value: string) {
    this.removeTimer();
    const d = new Date(value);
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    const timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days / 30.416));
    const years = Math.round(Math.abs(days / 365));
    if (Number.isNaN(seconds)) {
      return '';
    } else if (seconds <= 45) {
      return 'a few seconds ago';
    } else if (seconds <= 90) {
      return 'a minute ago';
    } else if (minutes <= 45) {
      return minutes + ' minutes ago';
    } else if (minutes <= 90) {
      return 'an hour ago';
    } else if (hours <= 22) {
      return hours + ' hours ago';
    } else if (hours <= 36) {
      return 'a day ago';
    } else if (days <= 25) {
      return days + ' days ago';
    } else if (days <= 45) {
      return 'a month ago';
    } else if (days <= 345) {
      return months + ' months ago';
    } else if (days <= 545) {
      return 'a year ago';
    } else { // (days > 545)
      return years + ' years ago';
    }
  }
  ngOnDestroy(): void {
    this.removeTimer();
  }
  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
  private getSecondsUntilUpdate(seconds: number) {
    const min = 60;
    const hr = min * 60;
    const day = hr * 24;
    if (seconds < min) { // less than 1 min, update every 2 secs
      return 2;
    } else if (seconds < hr) { // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) { // less then a day, update every 5 mins
      return 300;
    } else { // update every hour
      return 3600;
    }
  }
}

  `

  inputStarRatingHtml = `

  <div class="col-12 d-inline-flex star-rating" [ngClass]="{'p-0': padding === 0}">
    <div class="flex" *ngFor="let ratingId of ratingArr; index as i" [id]="'star_'+i">
        <fa-icon [icon]="['fas', showIcon(i)]" [ngStyle]="getSizeStyles()"></fa-icon>
    </div>
    <div class="ml-4 flex rating mt-2">
        <p>({{rating}} Stars)</p>
    </div>
  </div>

  `

  inputStarRatingScss = `

  .star-rating {
    fa-icon {
      color: #FF4436;
    }
  
    .rating {
        font-family: 'Raleway';
        font-weight: bold;
        font-size: 16px;
        color: #777777;
    }
  
  }

  `

  singleReviewCardHtml = `

  <div *ngIf="review" class="row">
    <div class="col-12 d-inline-flex">
        <div class="flex">
            <app-input-star-rating [rating]="review.rating" [starCount]="5" [padding]="0" [size]="24"></app-input-star-rating>
        </div>
        <div class="flex ml-2">
            <p class="review-author mt-2">by {{review.user_nickname}}<span class="ml-2">{{review.updated_at | timeAgo}}</span></p>
        </div>
    </div>
    <div class="col-12">
        <p class="review-body">{{review.body}}</p>
    </div>
  </div>

  `

  singleReviewCardScss = `
  h1 {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 24px;
    color: #777777;
}

.review-author {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 16px;
    color: #777777;
    span {
        color: #CCCCCC;
    }
}

.review-body {
    font-family: 'Raleway';
    font-weight: 500;
    font-size: 16px;
    color: #777777;
}

.read-all-reviews {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 16px;
    color: #777777;
    a {
        text-decoration: underline;
        color: #FF4436;
    }
}

  `

  constructor() { }

  ngOnInit(): void {
  }

}
