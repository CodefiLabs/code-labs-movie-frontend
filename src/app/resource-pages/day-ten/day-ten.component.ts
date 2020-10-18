import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-ten',
  templateUrl: './day-ten.component.html',
  styleUrls: ['./day-ten.component.scss']
})
export class DayTenComponent implements OnInit {
  newMovieHtml = `
  <div class="container mb-3">
    <div class="row">
        <div class="col-12 mt-5 pt-lg-5">
              <form class="form p-3 pt-5 p-lg-5" [formGroup]="form">
                <ngb-alert class="text-center" *ngIf="errorMsg" type="danger" (close)="errorMsg = null">{{ errorMsg }}
                </ngb-alert>
                <h2 class="mb-5">Create a New Movie</h2>
                <div class="form-group row">
                  <div class="col-12 col-md-6 end">
                    <label class="label">Title</label>
                    <input [ngClass]="{'is-invalid': hasError && form.get('title').errors}" class="form-control"
                      type="text" formControlName="title"
                      placeholder="">
                    <label class="form-error" *ngIf="hasError && form.get('title').errors">
                      <span class="text-danger" *ngIf="form.get('title').errors['required']" >
                        Title is required!
                      </span>
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <label class="label">Description</label>
                  <textarea rows="5" [ngClass]="{'is-invalid': hasError && form.get('description').errors}" class="form-control"
                    type="textarea" formControlName="description"
                    placeholder=""></textarea>
                  <label class="form-error" *ngIf="hasError && form.get('description').errors">
                    <span class="text-danger" *ngIf="form.get('description').errors['required']" >
                      Description is required!
                    </span>
                  </label>
                </div>
                <div class="form-group row">
                  <div class="col-12 col-md-6 end">
                    <label class="label">Rating</label>
                      <select [ngClass]="{'is-invalid': hasError && form.get('rating').errors}" class="form-control"
                      type="text" formControlName="rating">
                        <option *ngFor="let rating of movieRatings" [ngValue]="rating.val">{{rating.val}}</option>
                      </select>
                    <label class="form-error" *ngIf="hasError && form.get('rating').errors">
                      <span class="text-danger" *ngIf="form.get('rating').errors['required']" >
                        Rating is required!
                      </span>
                    </label>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12 col-md-6 end">
                    <label class="label">Released On</label>
                    <input [ngClass]="{'is-invalid': hasError && form.get('releaseDate').errors}" class="form-control"
                      type="date" formControlName="releaseDate"
                      placeholder="">
                    <label class="form-error" *ngIf="hasError && form.get('releaseDate').errors">
                      <span class="text-danger" *ngIf="form.get('releaseDate').errors['required']" >
                        Released On is required!
                      </span>
                    </label>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12 col-md-6 end">
                    <label class="label">Total Gross</label>
                    <input [ngClass]="{'is-invalid': hasError && form.get('totalGross').errors}" class="form-control"
                      type="text" formControlName="totalGross"
                      placeholder="">
                    <label class="form-error" *ngIf="hasError && form.get('totalGross').errors">
                      <span class="text-danger" *ngIf="form.get('totalGross').errors['required']" >
                        Total Gross is required!
                      </span>
                    </label>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12 col-md-6 end">
                    <label class="label">Duration</label>
                    <input [ngClass]="{'is-invalid': hasError && form.get('duration').errors}" class="form-control"
                      type="text" formControlName="duration"
                      placeholder="">
                    <label class="form-error" *ngIf="hasError && form.get('duration').errors">
                      <span class="text-danger" *ngIf="form.get('duration').errors['required']" >
                        Duration is required!
                      </span>
                    </label>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <label class="label" [ngClass]="{'text-danger': hasError && form.get('img').errors}">Image Upload</label>
                    <div class="row">
                      <div class="col-6">
                        <button class="btn btn-primary mt-4" (click)="openFileInput()">
                          <fa-icon [icon]="['fas', 'upload']" size="lg" class="text-white fa-upload"></fa-icon>
                          <span class="ml-2">Select Image</span>
                          <input #fileInput type="file" (change)="onSelectImage($event)" style="display:none;" />
                        </button>
                      </div>
                      <div class="col-6" *ngIf="!imageChangedEvent && form.get('img').value">
                        <img class="upload-icon" *ngIf="form.get('img').value"
                        [src]="form.get('img').value" #loadedLogo alt="Movie Image">
                      </div>
                      <div class="col-6" *ngIf="imageChangedEvent">
                        <image-cropper
                        [imageChangedEvent]="imageChangedEvent"
                        [maintainAspectRatio]="true"
                        [aspectRatio]="3 / 4"
                        format="png"
                        [resizeToWidth]="181"
                        (imageCropped)="onImageCropChanged($event)"
                        (imageLoaded)="imageLoaded()"
                        (cropperReady)="cropperReady()"
                        (loadImageFailed)="loadImageFailed()"
                      ></image-cropper>
                      <button class="btn btn-outline-primary" (click)="onImageCropClicked()">
                        Crop
                      </button>
                      </div>
                    </div>
                    <label class="form-error" *ngIf="hasError && form.get('img').errors">
                      <span class="text-danger" *ngIf="form.get('img').errors['required']" >
                        Image is required!
                      </span>
                    </label>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12 col-md-6 end">
                    <label class="label">Cast</label>
                    <input [ngClass]="{'is-invalid': hasError && form.get('cast').errors}" class="form-control"
                      type="text" formControlName="cast"
                      placeholder="">
                    <label class="form-error" *ngIf="hasError && form.get('cast').errors">
                      <span class="text-danger" *ngIf="form.get('cast').errors['required']" >
                        Cast is required!
                      </span>
                    </label>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12 col-md-6 end">
                    <label class="label">Director</label>
                    <input [ngClass]="{'is-invalid': hasError && form.get('director').errors}" class="form-control"
                      type="text" formControlName="director"
                      placeholder="">
                    <label class="form-error" *ngIf="hasError && form.get('director').errors">
                      <span class="text-danger" *ngIf="form.get('director').errors['required']" >
                        Director is required!
                      </span>
                    </label>
                  </div>
                </div>
            </form>
        </div>
        <!-- md & lg -->
          <div class="col-12 d-none d-md-inline-flex mt-5 mb-5 btn-row">
            <div class="flex">
              <button type="submit" class="btn btn-primary btn-block" (click)="submitForm()">CREATE MOVIE <fa-icon
                *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
              </fa-icon></button>
            </div>
            <div class="flex ml-4">
              <button type="submit" class="btn btn-outline-primary btn-block" (click)="cancel()">CANCEL <fa-icon
                *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
              </fa-icon></button>
            </div>
          </div>
          <!-- end of md & lg -->
          <!-- sm -->
          <div class="col-12 d-block d-md-none mt-5 mb-5">
            <div class="row">
              <div class="col-6">
                <button type="submit" class="btn btn-primary btn-block" (click)="submitForm()">CREATE MOVIE <fa-icon
                  *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
                </fa-icon></button>
              </div>
              <div class="col-6">
                <button type="submit" class="btn btn-outline-primary btn-block" (click)="cancel()">CANCEL <fa-icon
                  *ngIf="submitting" [icon]="['fas', 'spinner']" size="lg" class="ml-2 fa-spinner" spin="true">
                </fa-icon></button>
              </div>
            </div>
          </div>
          <!-- end of sm -->
    </div>
</div>
`
newMovieScss = `
.form {
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
.form {
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

extraMethods = `
openFileInput() {
  this.fileInput.nativeElement.click();
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

uploadImage() {
  let title;
  title = this.form.get('title').value; // grabbing the title value from form
  title = title.replace(/\s/g, '-'); // replaces spaces in title w/ '-'
  title = title.toLowerCase(); // Lower Case the title
  const name = title
    ? title
    : this.generateRandomString(14, '0123456789abcd'); // sets img name key or assigns random string
  this.movieService.uploadMovieImage(this.croppedImage, name, this.accessKey, this.secretKey);
  this.form
    .get('img')
    .setValue(
      'https://code-labs-one-movie-images.s3.us-east-2.amazonaws.com/images/' +
        name
    );
  return true;
}

generateRandomString(length, chars) {
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

cancel() {
  this.form.reset();
}
`

uploadMovieImg = `
uploadMovieImage(file, name, accessKey, secretKey) {
  const buf = new Buffer(file.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  const bucket = new S3({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: 'us-east-2',
  });
  const params = {
    Bucket: 'code-labs-one-movie-images',
    Key: 'images/' + name,
    Body: buf,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  };
  bucket.upload(params, function (err, data) {
    if (err) {
      console.log('There was an error uploading your file: ', err)
      return { success: false, error: err  }
    } else {
      console.log('Successfully uploaded file.', data)
      return { success: true, file: data.location }
    }
  })
}
`
  constructor() { }

  ngOnInit(): void {
  }

}
