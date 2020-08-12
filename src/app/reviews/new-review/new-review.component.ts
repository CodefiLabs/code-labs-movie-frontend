import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from './../../shared/services/movie.service';
import { ReviewService } from './../../shared/services/review.service';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, from } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss']
})
export class NewReviewComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formValues: any;
  submitting = false;
  hasError = false;
  errorMsg: string;
  currentUser: User;
  movie: Movie
  movieImg: string
  // Static Review Ratings List
  reviewRatings = [
    { id: 1, val: 1 },
    { id: 2, val: 2 },
    { id: 3, val: 3 },
    { id: 4, val: 4 },
    { id: 5, val: 5 },
  ];
  private subs = new Subscription();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private movieService: MovieService,
    private reviewService: ReviewService
  ) {
    this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit(): void {
    this.handleSubs()
    this.createFormControls();
    this.createForm();
  }

  handleSubs() {
    this.route.params.subscribe(data => {
      if (data && data.id) {
        this.retrieveMovie(data.id)
      }
    })
  }

  retrieveMovie(id: number) {
    const params = { id: id }
    this.subs.add(
      this.movieService.getMovieById(params).subscribe(data => {
        if (data && data.movie) {
          this.movie = new Movie(data.movie)
          if (this.movie.image) {
            this.movieImg = this.movie.image
          } else {
            this.movieImg = null
          }
        }
      })
    )
  }

  createFormControls() {
    this.formValues = {
      starRating: [null, Validators.compose([Validators.required])],
      body: ['', Validators.compose([Validators.required])],
    };
  }

  createForm() {
    this.form = this.fb.group(this.formValues);
  }

  // convenience getter for form controls
  get f() {
    if (this.form && this.form.controls) {
      return this.form.controls
    }
  }

  submitForm() {
    this.hasError = false;
    this.submitting = true;
    if (this.form.invalid) {
      this.hasError = true;
      this.submitting = false;
      return;
    }
    const form = this.form.value;
    const params = {
      user_id: this.currentUser.id,
      movie_id: this.movie.id,
      user_nickname: this.currentUser.nickname,
      rating: form.starRating,
      body: form.body
    };
    this.subs.add(
      this.reviewService.createReview(params).subscribe(
        (data) => {
          if (data) {
            this.submitting = false
            Swal.fire({
              icon: 'success',
              title: 'A new review has been successfully added!',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.form.reset()
            })
          }
        },
        (error) => {
          if (error) {
            console.log(error);
            this.submitting = false;
            this.hasError = true;
            this.errorMsg =
              'Something went wrong while trying to create that review!!';
          }
        }
      )
    );
  }

  setRatingValue(rating: any) {
    this.form.get('rating').setValue(rating.val);
  }

  setDefaultPic() {
    this.movieImg = 'assets/images/batman-vs-godzilla.png'
  }

  cancel() {
    this.form.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

