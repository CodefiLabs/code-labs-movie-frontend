import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './../../login/login.component';
import { Component, OnInit } from '@angular/core';
// import * as stylesheet from '../../login/login.component.scss'
@Component({
  selector: 'app-day-four',
  templateUrl: './day-four.component.html',
  styleUrls: ['./day-four.component.scss'],
})
export class DayFourComponent implements OnInit {
  componentCode = `
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  loginFormValues: any
  submitting = false
  hasError = false
  errorMsg: string
  currentUser: User
  private subs = new Subscription()
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const loggedOut = this.route.snapshot.params.success
    if (loggedOut) {
      Swal.fire({
        icon: 'success',
        title: 'You Have Been Successfully Logged Out!',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        this.router.navigate(['/login'])
      })
    }
    this.createFormControls()
    this.createForm()
  }

  createFormControls() {
    this.loginFormValues = {
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    }
  }

  createForm() {
    this.loginForm = this.fb.group(this.loginFormValues);
  }

  submitForm() {
    this.hasError = false
    this.submitting = true
    if (this.loginForm.invalid) {
      this.hasError = true
      this.submitting = false
      return
    }
    const form = this.loginForm.value
    const params = { email: form.email, password: form.password }
    this.subs.add(
      this.userService.login(params).subscribe(data => {
        if (data && data.success && data.user) {
          this.currentUser = data.user
          this.submitting = false
          this.router.navigate(['/home'])
        } else {
          this.submitting = false
          this.hasError = true
          this.errorMsg = 'Email and Password combination do not exist in this system!'
        }
      }, error => {
        if (error) {
          console.log(error)
          this.submitting = false
          this.hasError = false
          this.errorMsg = 'Email and Password combination do not exist in this system!'
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}

`
  componentCss = `

  .form {
    margin: 0px auto;
    max-width: 600px;
    box-shadow: 0px 3px 19px #0000000d;
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
  componentHtml = `
  <div class="row">
    <div class="col-12 mt-5 pt-lg-5">
        <form class="form p-5 mb-5 mt-lg-5" [formGroup]="form">
              <ngb-alert class="text-center" *ngIf="errorMsg" type="danger" (close)="errorMsg = null">{{ errorMsg }}
              </ngb-alert>
              <h2 class="mb-5">Sign Up</h2>
              <div class="form-group row">
                <div class="col-6">
                    <label class="label">First Name</label>
                    <input [ngClass]="{'is-invalid': hasError && form.get('firstName').errors}" class="form-control"
                      type="text" formControlName="firstName"
                      placeholder="Jane">
                    <label class="form-error" *ngIf="hasError && form.get('firstName').errors">
                      <span class="text-danger" *ngIf="form.get('firstName').errors['required']" >
                        First Name is required!
                      </span>
                    </label>
                </div>
                <div class="col-6">
                    <label class="label">Last Name</label>
                    <input [ngClass]="{'is-invalid': hasError && form.get('lastName').errors}" class="form-control"
                      type="text" formControlName="lastName"
                      placeholder="Doe">
                    <label class="form-error" *ngIf="hasError && form.get('lastName').errors">
                      <span class="text-danger" *ngIf="form.get('lastName').errors['required']" >
                        Last Name is required!
                      </span>
                    </label>
                </div>
              </div>
              <div class="form-group">
                <label class="label">Nickname</label>
                <input [ngClass]="{'is-invalid': hasError && form.get('nickName').errors}" class="form-control"
                  type="text" formControlName="nickName"
                  placeholder="Doe">
                <label class="form-error" *ngIf="hasError && form.get('nickName').errors">
                  <span class="text-danger" *ngIf="form.get('nickName').errors['required']" >
                    Nickname is required!
                  </span>
                </label>
              </div>
              <div class="form-group">
                <label class="label">Email</label>
                <input [ngClass]="{'is-invalid': hasError && form.get('email').errors}" class="form-control"
                  type="email" formControlName="email"
                  placeholder="you@youremailaddress.com">
                <label class="form-error" *ngIf="hasError && form.get('email').errors">
                  <span class="text-danger" *ngIf="form.get('email').errors['required']" >
                    Email is required!
                  </span>
                </label>
              </div>
              <div class="form-group">
                <label class="label">Password</label>
                <input [ngClass]="{'is-invalid': hasError && form.get('password').errors}" class="form-control"
                  type="password" formControlName="password"
                  placeholder="xxxxxxxxx">
                <label class="form-error" *ngIf="hasError && form.get('password').errors">
                  <span class="text-danger" *ngIf="form.get('password').errors['required']" >
                    Password is required!
                  </span>
                </label>
              </div>
              <div class="form-group">
                <label class="label">Password</label>
                <input [ngClass]="{'is-invalid': hasError && form.get('passwordConfirmation').errors}" class="form-control"
                  type="password" formControlName="passwordConfirmation"
                  placeholder="xxxxxxxxx">
                  <label class="form-error" *ngIf="hasError && form.get('passwordConfirmation').errors">
                    <span class="text-danger">
                        Password Confirmation is required!
                    </span>
                </label>
                <label class="form-error" 
                    *ngIf="f.passwordConfirmation.errors && f.passwordConfirmation.errors.mustMatch">
                    <span class="text-danger">
                        Password and Password Confirmation Must Match.
                    </span>
                </label>
              </div>
              <div class="form-footer-btns form-group mt-5 mb-2 row">
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary btn-block" (click)="submitForm()">Register<fa-icon
                        *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
                      </fa-icon></button>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-outline-primary btn-block" (click)="cancelForm()">Cancel<fa-icon
                        *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
                      </fa-icon></button>
                  </div>
              </div>
              <div class="col-12 text-center mt-4 p-0">
                  <p class="form-bottom-p">Already signed up? <a class="form-link" [routerLink]="['/login']">Sign in here</a></p>
              </div>
          </form>
    </div>
</div>
`

  stylesScss = `
  /* You can add global styles to this file, and also import other style files */

  /* Importing Bootstrap SCSS file. */
  @import "~bootstrap/scss/bootstrap";

  // Importing Needed Google Fonts
  @import url("https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=Montserrat&family=Raleway:ital,wght@0,500;0,700;1,500&display=swap");


  // Notes on font usage
  // font-family: 'Bitter', serif;
  // available font-weights: 700/bold
  // font-family: 'Montserrat', sans-serif;
  // available font-weights: 400/regular
  // font-family: 'Raleway', sans-serif;
  // available font-weights: 500 italic, 500, 700/bold

  // Overiding Boostrap Card Styles
  .card {
    box-shadow: 0px 3px 19px #0000000d;
    border-radius: 5px;
    border: none;
  }
  // Overiding Bootstrap Button Styles
  .btn-primary {
    font-family: "Raleway";
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    color: white;
    background: rgb(255, 68, 54);
    border: rgb(255, 68, 54);
    border-radius: 25px;
    min-width: 100px;
    min-height: 40px;
  }
  .btn-primary:hover,
  .btn-primary:not(:disabled):not(.disabled):active {
    color: white;
    background: darken(rgb(255, 68, 54), 10%);
    border: darken(rgb(255, 68, 54), 10%);
    border-radius: 25px;
  }
  .btn-outline-primary {
    font-family: "Raleway";
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    color: rgb(255, 68, 54);
    background: transparent;
    border-color: rgb(255, 68, 54);
    border-radius: 25px;
    border-width: 2px;
    min-width: 100px;
    min-height: 40px;
  }
  .btn-outline-primary:hover,
  .btn-outline-primary:not(:disabled):not(.disabled):active {
    color: darken(rgb(255, 68, 54), 10%);
    background: transparent;
    border-color: darken(rgb(255, 68, 54), 10%);
    border-radius: 25px;
  }

  // input overide
  input,
  .form-control {
    border-radius: 25px !important;
  }

  // overides for small devices
  @media (max-width: 576px) {
    .form {
      max-width: 95vw;
    }
  }

  // overides for small devices
  @media (min-width: 576px) {
    .btn-primary, .btn-outline-primary {
      min-width: 150px;
      min-height: 40px;
    }
  }

  html, body { height: 100%; }
  body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }

  `

  mustMatchValidator = `
  import { FormGroup } from '@angular/forms';

  // custom validator to check that two fields match
  export function MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
  }

  `
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {


  }

  copyComponentCode() {

  }

}
