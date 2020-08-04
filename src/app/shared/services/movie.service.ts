import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieApi: string
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.movieApi = `${environment.apiUrl}api/v1/movies`
  }

  getAllMovies() {
    return this.http.get<any>(`${this.movieApi}/index`)
  }

  getMovieById(params) {
    return this.http.get<any>(`${this.movieApi}/show/${params.id}`)
  }

  createMovie(params) {
    return this.http.post<any>(`${this.movieApi}/create`, params)
  }

  updateMovie(params) {
    return this.http.patch<any>(`${this.movieApi}/update`, params)
  }

  deleteMovie(params) {
    return this.http.delete<any>(`${this.movieApi}/${params.id}`)
  }

}
