import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {of,  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieApi: string;
  constructor(private router: Router, private http: HttpClient) {
    this.movieApi = `${environment.apiUrl}api/v1/movies`;
  }

  getAllMovies() {
    return this.http.get<any>(`${this.movieApi}/index`);
  }

  getMovieById(params) {
    return this.http.get<any>(`${this.movieApi}/show/${params.id}`);
  }

  createMovie(params) {
    return this.http.post<any>(`${this.movieApi}/create`, params);
  }

  updateMovie(params) {
    return this.http.patch<any>(`${this.movieApi}/update`, params);
  }

  deleteMovie(params) {
    return this.http.delete<any>(`${this.movieApi}/${params.id}`);
  }

  uploadMovieImage(file, name) {
    const buf = new Buffer(file.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    const bucket = new S3({
      accessKeyId: 'AKIARVMY25IMSSLFJXEK',
      secretAccessKey: 'mTi3i9uX5h5W+ErQTDjbLdAHIMkQac4o53L5IFnJ',
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
}
