import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-star-rating',
  templateUrl: './input-star-rating.component.html',
  styleUrls: ['./input-star-rating.component.scss']
})
export class InputStarRatingComponent implements OnInit {
  @Input() rating: number
  @Input() starCount: number
  @Input() color = 'gold'
  @Input() padding: number

  snackBarDuration = 2000
  ratingArr = []

  constructor() {
  }


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index)
    }
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star'
    } else {
      return 'star-half-alt'
    }
  }

}
