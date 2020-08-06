import { MovieService } from './../../shared/services/movie.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';


@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss'],
})
export class NewMovieComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formValues: any;
  submitting = false;
  hasError = false;
  errorMsg: string;
  currentUser: User;
  // Static Movie Ratings List
  movieRatings = [
    {id: 1, val: 'G'},
    {id: 2, val: 'PG'},
    {id: 3, val: 'PG-13'},
    {id: 4, val: 'R'},
    {id: 5, val: 'NC-17'}
  ]
  // Image Cropper Vars
  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef
  @ViewChild('cropper', {static: false}) cropper: ElementRef
  @ViewChild(ImageCropperComponent, {static: false}) imageCropper: ImageCropperComponent
  private subs = new Subscription();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private movieService: MovieService,
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.formValues = {
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      rating: ['', Validators.compose([Validators.required])],
      releaseDate: ['', Validators.compose([Validators.required])],
      totalGross: [0, Validators.compose([Validators.required])],
      duration: [0, Validators.compose([Validators.required])],
      img: ['', Validators.compose([Validators.required])],
      cast: ['', Validators.compose([Validators.required])],
      director: ['', Validators.compose([Validators.required])],
    };
  }

  createForm() {
    this.form = this.fb.group(this.formValues);
  }

  submitForm() {
    this.hasError = false;
    this.submitting = true;
    if (this.form.invalid) {
      this.hasError = true;
      this.submitting = false;
      return;
    }
    const form = this.form.value;
    const params = {
      title: form.title, description: form.description,
      rating: form.rating, releaseDate: form.releaseDate,
      totalGross: form.totalGross, duration: form.duration,
      img: form.img, cast: form.cast, director: form.director
    };
    this.subs.add(
      this.movieService.createMovie(params).subscribe(
        (data) => {
          if (data) {
            debugger
            this.currentUser = data.user;
            this.submitting = false;
          }
        },
        (error) => {
          if (error) {
            console.log(error);
            this.submitting = false;
            this.hasError = true;
            this.errorMsg =
              'Something went wrong while trying to create that movie!!';
          }
        }
      )
    );
  }

  setRatingValue(rating: any) {
    this.form.get('rating').setValue(rating.val)
  }

  openFileInput() {
    this.fileInput.nativeElement.click()
  }

  onSelectImage($event: ImageCroppedEvent) {
    this.imageChangedEvent = $event;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // ngx-image-cropper-methods

  onImageCropChanged(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  onImageCropClicked() {
    this.form.get('img').setValue(this.croppedImage);
    this.imageChangedEvent = null;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
      // cropper ready
  }

  loadImageFailed() {
      // show message
  }

  cancel() {
    this.form.reset()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
