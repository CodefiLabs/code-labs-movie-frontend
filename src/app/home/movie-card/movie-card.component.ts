import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnChanges {
  @Input() movie: Movie
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }

}
