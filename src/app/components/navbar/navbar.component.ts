import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User
  private subs = new Subscription()
  constructor(
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUserValue // gets the currentUser value from the userService
  }

  ngOnInit(): void {
    this.subscribeToCurrentUser()
  }

  subscribeToCurrentUser() {
    this.subs.add( // creates a new subscription
      this.userService.currentUser.subscribe(user => { // creates the subscription
        if (user) { // if the logged in users exists set that value in this component
          this.currentUser = user
        } else { // else set the current user as null
          this.currentUser = null
        }
      })
    )
  }

  logoutUser() {
    this.userService.logoutUser()
  }

  ngOnDestroy() {
    this.subs.unsubscribe() // destroy all subscriptions to prevent memory leak
  }

}
