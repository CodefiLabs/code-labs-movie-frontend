import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { MovieService } from '../shared/services/movie.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private currentUser: User
  private subs = new Subscription()
  constructor(
    private router: Router,
    private userService: UserService,
    private movieService: MovieService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.handleSubs()
  }

  handleSubs() {
    this.subToCurrentUser()
    this.retrieveAllMovies()
  }

  subToCurrentUser() {
    this.subs.add(
      this.userService.currentUser.subscribe(user => {
        if (user) {
          this.currentUser = user
        } else {
          this.currentUser = null
        }
      })
    )
  }

  retrieveAllMovies() {
    this.subs.add( // adds a new subscription to the array
      this.movieService.getAllMovies().subscribe(data => { // get all movies
        if (data) {
          debugger
        }
      }, error => {
        if (error) {
          console.error(error)
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe() // Destroy all subs to prevent memory leak
  }

}
