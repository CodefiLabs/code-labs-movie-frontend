import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
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
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
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
        if (data) {
          this.currentUser = data
          this.submitting = false
        }
      }, error => {
        if (error) {
          console.log(error)
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
