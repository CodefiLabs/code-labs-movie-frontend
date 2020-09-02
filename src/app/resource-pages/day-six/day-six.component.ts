import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-six',
  templateUrl: './day-six.component.html',
  styleUrls: ['./day-six.component.scss']
})
export class DaySixComponent implements OnInit {

  loginHtml = `

  <div class="row">
    <div class="col-12 mt-5 pt-lg-5">
        <form class="form p-5 mt-lg-5" [formGroup]="loginForm">
              <ngb-alert class="text-center" *ngIf="errorMsg" type="danger" (close)="errorMsg = null">{{ errorMsg }}
              </ngb-alert>
              <h2 class="mb-5">Login</h2>
              <div class="form-group">
                <label class="label">Email</label>
                <input [ngClass]="{'is-invalid': hasError && loginForm.get('email').errors}" class="form-control"
                  type="email" formControlName="email"
                  placeholder="you@youremailaddress.com">
                <label class="form-error" *ngIf="hasError && loginForm.get('email').errors">
                  <span class="text-danger" *ngIf="loginForm.get('email').errors['required']" >
                    Email is required!
                  </span>
                </label>
              </div>
              <div class="form-group">
                <label class="label">Password</label>
                <input [ngClass]="{'is-invalid': hasError && loginForm.get('password').errors}" class="form-control"
                  type="password" formControlName="password"
                  placeholder="xxxxxxxxx">
                <label class="form-error" *ngIf="hasError && loginForm.get('password').errors">
                  <span class="text-danger" *ngIf="loginForm.get('password').errors['required']" >
                    Password is required!
                  </span>
                </label>
              </div>
              <div class="form-footer-btns mt-5 mb-2">
                <button type="submit" class="btn btn-primary btn-block" (click)="submitForm()">Log In <fa-icon
                    *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
                  </fa-icon></button>
              </div>
              <div class="col-12 text-center mt-4">
                <p class="form-bottom-p">Haven't registered? <a class="form-link" [routerLink]="['/signup']">Sign up</a></p>
            </div>
          </form>
    </div>
</div>

  `

  loginScss = `
  
  .form {
    margin: 0px auto;
    max-width: 500px;
    box-shadow: 0px 3px 19px #0000000D;
    .label {
      font-family: 'Raleway';
      font-weight: bold;
      font-size: 16px;
      color: #777777;
    }
  }
  
  h2 {
    font-family: 'Bitter';
    font-weight: bold;
    font-size: 38px;
    color: #777777;
  }
  
  .form-bottom-p {
    font-family: "Raleway";
    font-weight: bold;
    font-size: 16px;
    color: #777777;
  }
  .form-link {
    color: #ff4436;
    text-decoration: underline;
  }
  
  `

  navbarHtml = `
  <nav *ngIf="currentUser" class="navbar navbar-expand navbar-dark">
  <a class="navbar-brand" [routerLink]="['/home']">
      <img src="./assets/images/code-flix-logo.svg" width="150" height="30" />
  </a>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
              <a class="nav-link d-none d-lg-block" [routerLink]="['/home']">
                  <button class="btn btn-outline-primary btn-flix-navbar">All Movies
                      <fa-icon [icon]="['fas', 'arrow-right']" size="sm" class="ml-2 text-flix-red"></fa-icon>
                  </button>
              </a>
          </li>
          <li class="nav-item active icon d-block d-lg-none">
              <a class="nav-link" [routerLink]="['/home']">
                  <fa-stack>
                      <fa-icon [icon]="['fas', 'circle']" class="text-flix-red" stackItemSize="2x"></fa-icon>
                      <fa-icon [icon]="['fas', 'video']" class="text-white" stackItemSize="1x"></fa-icon>
                  </fa-stack>
              </a>
          </li>
          <li class="nav-item mr-5 d-none d-lg-block">
              <a class="nav-link" [routerLink]="['/movies/new']">
                  <button class="btn btn-outline-primary btn-flix-navbar">Add New Movie
                      <fa-icon [icon]="['fas', 'plus']" size="sm" class="ml-2 text-flix-red"></fa-icon>
                  </button>
              </a>
          </li>
          <li class="nav-item icon active d-block d-lg-none">
              <a class="nav-link" [routerLink]="['/movies/new']">
                  <fa-stack>
                      <fa-icon [icon]="['fas', 'circle']" class="text-flix-red" stackItemSize="2x"></fa-icon>
                      <fa-icon [icon]="['fas', 'plus']" class="text-white" stackItemSize="1x"></fa-icon>
                  </fa-stack>
              </a>
          </li>
          <li class="nav-item active mt-2 d-none d-md-block">
              <a class="nav-link text-uppercase">
                  Hi, {{currentUser.nickname}}!
              </a>
          </li>
          <li class="nav-item small ml-small-10 active mt-2">
              <a class="nav-link text-uppercase vl-red">
              </a>
          </li>
          <li class="nav-item small active mt-2 w-small">
              <a class="nav-link text-uppercase" (click)="logoutUser()">
                  SIGN OUT
              </a>
          </li>
      </ul>
  </div>
</nav>
<nav *ngIf="!currentUser" class="navbar navbar-expand navbar-dark">
  <a class="navbar-brand" [routerLink]="['/home']">
      <img src="./assets/images/code-flix-logo.svg" width="150" height="30" />
  </a>
  <ul class="navbar-nav ml-auto">
      <li class="nav-item active mr-5 d-none d-lg-block">
          <a class="nav-link" [routerLink]="['/home']">
              <button class="btn btn-outline-primary btn-flix-navbar">All Movies
                  <fa-icon [icon]="['fas', 'arrow-right']" size="sm" class="ml-2 text-flix-red"></fa-icon>
              </button>
          </a>
      </li>
      <li class="nav-item icon active d-block d-lg-none">
          <a class="nav-link" [routerLink]="['/home']">
              <fa-stack>
                  <fa-icon [icon]="['fas', 'circle']" class="text-flix-red" stackItemSize="2x"></fa-icon>
                  <fa-icon [icon]="['fas', 'video']" class="text-white" stackItemSize="1x"></fa-icon>
              </fa-stack>
          </a>
      </li>
      <li class="nav-item small ml-small-20 active mt-2">
          <a class="nav-link text-uppercase" [routerLink]="['/login']">
              Sign In
          </a>
      </li>
      <li class="nav-item small active mt-2">
          <a class="nav-link text-uppercase vl-red">
          </a>
      </li>
      <li class="nav-item small active mt-2">
          <a class="nav-link text-uppercase" [routerLink]="['/signup']">
              Sign up
          </a>
      </li>
  </ul>
</nav>

  `

  navbarScss = `

  .navbar {
    height: 85px;
    background-color: #222222 !important;
    box-shadow: 0px 3px 19px #00000041;
  }
  
  li {
    cursor: pointer;
  }
  
  .btn-flix-navbar {
    border-color: #FF4436;
    border-width: 2px;
    border-style: solid;
    border-radius: 25px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-family: 'Raleway';
  }
  
  .btn-flix-navbar:hover,
  .btn-flix-navbar:not(:disabled):not(.disabled):active {
    border-width: 3px;
    background: transparent !important;
    border-color: #FF4436;
  }
  
  .text-flix-red {
    color: #FF4436;
  }
  
  .center-navbar-brand {
    transform: translateX(-50%);
    left: 50%;
    position: absolute;
  }
  
  .vl-red::after {
      content: '|';
      color: #FF4436;
      height: 20px;
  }
  .circle-container {
    display: inline-block;
    border-radius: 60px;
    box-shadow: 0px 0px 2px #888;
    padding: 0.5em 0.6em;
    background: #FF4436;
  }
  
  .nav-link {
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 16px;
    a {
      font-size: 16px;
    }
  }
  
  @media (max-width: 767px) {
    .navbar {
      padding-right: 8px;
      height: auto;
    }
    .navbar-brand {
      img {
        max-width: 100px;
      }
    }
    .nav-link {
      font-size: 14px;
      a {
        font-size: 14px;
      }
    }
    .nav-item.icon {
      font-size: 18px;
      margin-top: 0.5em;
      margin-right: 0.5em;
      width: 30px;
    }
    .nav-item.small {
      margin-top: 0.5em;
      margin-right: 0.5em;
      a {
        padding: 2px;
        padding-top: 12px;
      }
    }
    .ml-small-20 {
      margin-left: 20px;
    }
    .ml-small-10 {
      margin-left: 10px;
    }
  }

  `

  constructor() { }

  ngOnInit(): void {
  }

}
