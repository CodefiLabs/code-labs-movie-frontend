import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-nine',
  templateUrl: './day-nine.component.html',
  styleUrls: ['./day-nine.component.scss']
})
export class DayNineComponent implements OnInit {
  reviewComponentHtml = `
  <div class="container mb-3">
    <!-- med & lg row -->
    <div class="row d-none d-md-block">
        <div class="col-12 mt-5 pt-5 d-inline-flex form-col">
            <div class="flex">
                <form class="form p-3" [formGroup]="form">
                    <ngb-alert class="text-center" *ngIf="errorMsg" type="danger" (close)="errorMsg = null">{{ errorMsg }}
                    </ngb-alert>
                    <h2 class="mb-5">New Review for <span>{{movie.title}}</span></h2>
                    <div class="form-group">
                            <label class="label">Star Rating</label>
                            <div class="row">
                                <div class="col-12 d-inline-flex justify-content-between" ngbRadioGroup name="radioBasic" formControlName="starRating" [ngClass]="{'is-invalid': hasError && form.get('starRating').errors}">
                                    <div class="flex" *ngFor="let rating of reviewRatings">
                                        <label ngbButtonLabel>
                                            <input ngbButton type="radio" [value]="rating.val"><span class="ml-4">{{rating.val}}</span>
                                          </label>
                                    </div>
                                </div>
                            </div>
                          <label class="form-error" *ngIf="hasError && form.get('starRating').errors">
                            <span class="text-danger" *ngIf="form.get('starRating').errors['required']" >
                              Star Rating is required!
                            </span>
                          </label>
                        </div>
                    <div class="form-group">
                        <label class="label">Body</label>
                        <textarea rows="8" [ngClass]="{'is-invalid': hasError && form.get('body').errors}" class="form-control"
                          type="text" formControlName="body"
                          placeholder=""></textarea>
                        <label class="form-error" *ngIf="hasError && form.get('body').errors">
                          <span class="text-danger" *ngIf="form.get('body').errors['required']" >
                            Review Body is required!
                          </span>
                        </label>
                    </div>
                </form>
            </div>
            <div class="ml-auto flex movie-img">
                <img class="img img-fluid" [src]="movieImg" (error)="setDefaultPic()">
            </div>
        </div>
          <div class="col-12 d-inline-flex mt-5 mb-5 btn-row">
            <div class="flex">
              <button type="submit" class="btn btn-primary btn-block" (click)="submitForm()">Submit <fa-icon
                *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
              </fa-icon></button>
            </div>
            <div class="flex ml-4">
              <button type="submit" class="btn btn-outline-primary btn-block" (click)="cancel()">CANCEL <fa-icon
                *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
              </fa-icon></button>
            </div>
          </div>
    </div>
    <!-- end of med & lg row -->
    <!-- sm row -->
    <div class="row d-block d-md-none">
        <div class="col-12 mt-5 pt-5 d-inline-flex form-col">
            <div class="flex">
                <h2 class="mb-5">New Review for <span>{{movie.title}}</span></h2>
            </div>
            <div class="ml-auto flex movie-img">
                <img class="img img-fluid" [src]="movieImg" (error)="setDefaultPic()">
            </div>
        </div>
        <div class="col-12 bg-white">
            <form class="form p-3" [formGroup]="form">
                <ngb-alert class="text-center" *ngIf="errorMsg" type="danger" (close)="errorMsg = null">{{ errorMsg }}
                </ngb-alert>
                <div class="form-group">
                        <label class="label">Star Rating</label>
                        <div class="row">
                            <div class="col-12 d-inline-flex justify-content-between" ngbRadioGroup name="radioBasic" formControlName="starRating" [ngClass]="{'is-invalid': hasError && form.get('starRating').errors}">
                                <div class="flex" *ngFor="let rating of reviewRatings">
                                    <label ngbButtonLabel>
                                        <input ngbButton type="radio" [value]="rating.val"><span class="ml-4">{{rating.val}}</span>
                                      </label>
                                </div>
                            </div>
                        </div>
                      <label class="form-error" *ngIf="hasError && form.get('starRating').errors">
                        <span class="text-danger" *ngIf="form.get('starRating').errors['required']" >
                          Star Rating is required!
                        </span>
                      </label>
                    </div>
                <div class="form-group">
                    <label class="label">Body</label>
                    <textarea rows="8" [ngClass]="{'is-invalid': hasError && form.get('body').errors}" class="form-control"
                      type="text" formControlName="body"
                      placeholder=""></textarea>
                    <label class="form-error" *ngIf="hasError && form.get('body').errors">
                      <span class="text-danger" *ngIf="form.get('body').errors['required']" >
                        Review Body is required!
                      </span>
                    </label>
                </div>
            </form>
        </div>
          <div class="col-12 mt-5 mb-5">
            <div class="row">
                <div class="col-6 text-center">
                    <button type="submit" class="btn btn-primary btn-block" (click)="submitForm()">Submit <fa-icon
                        *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
                      </fa-icon></button>
                </div>
                <div class="col-6 text-center">
                    <button type="submit" class="btn btn-outline-primary btn-block" (click)="cancel()">CANCEL <fa-icon
                        *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
                      </fa-icon></button>
                </div>
            </div>
          </div>
    </div>
    <!-- end of sm row -->
  </div>
  `
  reviewComponentScss = `
  .movie-img {
    margin-top: -70px;
  }
  .form-col {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 19px #0000000d;
    border-radius: 5px;
    max-width: 960px;
    margin: 0px auto;
    h2 {
        font-family: 'Bitter';
        font-weight: bold;
        font-size: 38px;
        color: #777777;
        span {
            color: #FF4436;
        }
    }
    label, input {
        font-family: 'Raleway';
        font-size: 16px;
        color: #777777;
    }
    label {
        font-weight: bold;
    }
    input {
        font-weight: 500;
    }
  }
  .btn-row {
      max-width: 960px;
      margin: 0px auto;
  }
  `
  constructor() { }

  ngOnInit(): void {
  }

}
