import { Review } from './../../shared/models/review';
import { Subscription } from 'rxjs';
import { MovieService } from './../../shared/services/movie.service';
import { Movie } from 'src/app/shared/models/movie';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit, OnDestroy {
  movie: Movie
  movieImg: string
  reviews: Review[] = []
  avgMovieRating = 5.0
  private subs = new Subscription()
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(movie => {
      if (movie && movie.id) {
        this.retrieveMovie(movie.id)
      }
    })
  }

  retrieveMovie(id: number) {
    const params = { id: id }
    this.subs.add(
      this.movieService.getMovieById(params).subscribe(data => {
        if (data) {
          console.log(data)
          this.movie = new Movie(data.movie) // map the return json movie to the movie model
          this.movieImg = this.movie.image // assign the movieImg
          if (data && data.reviews && data.reviews.length) { // check if there are reviews in the return json
            this.reviews = data.reviews.map(x => new Review(x)) // if there are reviews... model them out
            this.computeTheAverageReviewRating(this.reviews)
          } else {
            this.reviews = [] // else set the reviews as empty
            this.avgMovieRating = 5.0
          }
        }
      }, error => {
        if (error) {
          console.error(error)
        }
      })
    )
  }

  computeTheAverageReviewRating(reviews: Review[]) {
    const totalReviews = reviews.length
    let totalRating
    this.reviews.forEach(x => {
      totalRating += x.rating
    })
    this.avgMovieRating = ( totalRating / totalReviews )
  }

  setDefaultPic() {
    this.movieImg = 'assets/images/batman-vs-godzilla.png'
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
