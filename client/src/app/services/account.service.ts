import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.apiUrl + 'account/'
  user$ = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient) { }

  login(body) {
    return this.http.post(this.baseUrl + 'login', body)
  }

  register(body) {
    return this.http.post(this.baseUrl + 'register', body , { responseType: 'text' })
  }

  logout() {
    this.user$.next(null)
    localStorage.removeItem("token")
  }

  getToken() {
    const jwt = new JwtHelperService()
    let t: any = JSON.parse(localStorage.getItem("token"))
    if(t == null) return null
    return t.token
  }

  decodedToken() {
    const jwt = new JwtHelperService()
    return jwt.decodeToken(this.getToken())
  }

  isTokenExpired() {
    const jwt = new JwtHelperService()
    return jwt.isTokenExpired(this.getToken())
  }
}
