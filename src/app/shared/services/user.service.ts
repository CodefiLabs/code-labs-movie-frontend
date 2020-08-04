import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>
  private userApi: string
  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: LocalStorageService
  ) {
    this.userApi = `${environment.apiUrl}api/v1/users`
    this.currentUserSubject = new BehaviorSubject<User>(this.storage.getItem('currentUser'))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value // returns the currentUser value to components
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user) // sets the currentUserSubject
  }

  login(params) {
    return this.http.post<any>(`${this.userApi}/login`, params) // post the login params to the api
      .pipe(
        catchError(this.handleError), // catch and handle any errors returning from the api
        map(res => { // map the response before we return it to the component
          if (res && res.token) { // response is successful
            const newUser = new User(res) // map the res to the user model
            this.storage.setItem('accessToken', res.accessToken) // set the res.token in the browser's local storage
            this.storage.setItem('currentUser', newUser) // set the newUser in the browser's local storage
            this.currentUserSubject.next(newUser) // set the newUser in the currentUser subject/observable
            return { success: true, user: res } // return the success res and user to the login component
          } else { // something went wrong
            return { success: false, msg: 'Invlaid Credentials' } // invalid login credentials
          }
        })
      )
  }

  signup(params) {
    return this.http.post<any>(`${this.userApi}/create`, params)
  }

  logout(params) {
    return this.http.delete<any>(`${this.userApi}/logout`, params)
    .pipe(
      catchError(this.handleError), // catch and handle any errors returning from the api
      map(x => { // map the successful logout()
        if (x) {
          this.removeCurrentUserAndRoute() // remove local storage vars and route back to login
        }
      })
    )
  }

  removeCurrentUserAndRoute() {
    // set the local storage vars as undefined, remove, and then route back to login
    this.storage.setItem('currentUser', undefined)
    this.storage.setItem('accessToken', undefined)
    this.storage.removeItem('currentUser')
    this.storage.removeItem('accessToken')
    this.router.navigate(['/login', { success: true }])
  }

  handleError(error) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(errorMessage)
  }

}
