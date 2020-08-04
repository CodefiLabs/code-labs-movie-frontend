import { LocalStorageService } from './local-storage.service'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthorizationHeaderService implements HttpInterceptor {

  constructor(
    private router: Router,
    private storage: LocalStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const blackListedRoutes = [
      '/users/login'
    ]

    const token = this.storage.getItem('accessToken') // grab the accessToken from storage

    const user = this.storage.getItem('currentUser') // grab the currentUser from storage

    let found = false;
    // FOR CURRENT USER ONLY
    // CHECKS IF THE REQ IS FOR A LOGIN METHOD
    for (let i = 0; i < blackListedRoutes.length; i++) {
      if (blackListedRoutes[i] === req['url']) {
        found = true;
        break;
      }
    }
    if (user && token && found === false) { // if user, token, and not a login method append the auth header
      const authReq = req.clone({ setHeaders: { 'Authorization': token } });
      return next.handle(authReq)
    } else {
      return next.handle(req)
    }

  } // END OF INTERCEPTOR

}

