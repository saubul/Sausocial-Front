import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SignupRequestPayload } from '../component/auth/signup/signup-request.payload';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginRequestPayload } from '../component/auth/login/login-request.payload';
import { LoginResponsePayload } from '../component/auth/login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.localStorage.retrieve('accessToken'));

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
   }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = `username=${loginRequestPayload.username}&password=${loginRequestPayload.password}`;
    return this.httpClient.post("http://localhost:8080/api/auth/login", body, {headers: headers})
            .pipe(
              map(data => {
                let tokens = JSON.parse(JSON.stringify(data))
                let response: LoginResponsePayload = new LoginResponsePayload(tokens['accessToken'], 
                                                                              tokens['refreshToken'],
                                                                              tokens['username'],
                                                                              tokens['expiresAt']);
                this.localStorage.store('accessToken', response.accessToken);
                this.localStorage.store('refreshToken', response.refreshToken);
                this.localStorage.store('username', response.username);
                this.localStorage.store('expiresAt', response.expiresAt);
                this.isLoggedIn.next(this.localStorage.retrieve('accessToken'))
                return true;
              })
            );
  }

  logout() {
    this.localStorage.clear('accessToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.isLoggedIn.next(this.localStorage.retrieve('accessToken'))
  }

  refreshToken(): Observable<LoginResponsePayload> {
      let jwtHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.getRefreshToken())
      return this.httpClient.get<LoginResponsePayload>('http://localhost:8080/api/auth/refreshToken', {headers: jwtHeader})
                            .pipe(tap(data => {
                              this.localStorage.clear('accessToken');
                              this.localStorage.clear('expiresAt');

                              this.localStorage.store('accessToken', data.accessToken);
                              this.localStorage.store('expiresAt', data.expiresAt);

                            }))
  }
  getUsername(): string {
    return this.localStorage.retrieve('username')
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken')
  }
  getExpiresAt() {
    return this.localStorage.retrieve('expiresAt')
  }
  getJwtToken() {
    return this.localStorage.retrieve('accessToken');
  }

  signUp(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/auth/signUp", signupRequestPayload, {responseType: 'text'})
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  } 

  
}