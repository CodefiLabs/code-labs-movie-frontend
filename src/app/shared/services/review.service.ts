import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewApi: string;
  constructor(private router: Router, private http: HttpClient) {
    this.reviewApi = `${environment.apiUrl}api/v1/reviews`;
  }

  getAllReviews() {
    return this.http.get<any>(`${this.reviewApi}/index`);
  }

  createReview(params) {
    return this.http.post<any>(`${this.reviewApi}/create`, params);
  }

  updateReview(params) {
    return this.http.patch<any>(`${this.reviewApi}/update`, params);
  }

  deleteReview(params) {
    return this.http.delete<any>(`${this.reviewApi}/${params.id}`);
  }

}
