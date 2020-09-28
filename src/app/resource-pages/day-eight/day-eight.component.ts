import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-eight',
  templateUrl: './day-eight.component.html',
  styleUrls: ['./day-eight.component.scss']
})
export class DayEightComponent implements OnInit {

  allReviewsHtml = `
  <div class="container mb-3">
    <div class="row mt-5">
        <div class="col-12 mt-5 mb-5">
            <div *ngIf="movie" class="card p-4">
                <div class="d-inline-flex w-100">
                    <div class="flex">
                        <h5 class="movie-title">Reviews for <span>{{movie.title}}</span></h5>
                        <div class="row">
                            <div *ngFor="let review of reviews" class="col-12">
                                <app-single-review-card [review]="review"></app-single-review-card>
                                <hr>
                            </div>
                        </div>
                    </div>
                    <div class="ml-auto flex movie-img">
                        <img class="img img-fluid" [src]="movieImg" (error)="setDefaultPic()">
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
        </div>
    </div>
</div>
`

allReviewsScss = `
.movie-img {
  margin-top: -50px;
}
.movie-title {
  font-family: 'Bitter';
  font-weight: bold;
  font-size: 38px;
  color: #777777;
  span {
      color: #FF4436;
  }
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

singleReviewHtml = `
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

singleReviewScss = `
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
