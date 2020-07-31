import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApi: string
  constructor(
    private http: HttpClient
  ) {
    this.userApi = `${environment.apiUrl}api/v1/login/`
  }

  login(params) {
    return this.http.post<any>(`${this.userApi}/sign_in`, params)
  }

  logout(params) {
    return this.http.delete<any>(`${this.userApi}/sign_out`, params)
  }
}
