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
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {


  }

  copyComponentCode() {
    
  }

}
