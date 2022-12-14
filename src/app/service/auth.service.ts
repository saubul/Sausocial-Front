import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SignupRequestPayload } from '../component/auth/signup/signup-request.payload';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginRequestPayload } from '../component/auth/login/login-request.payload';
import { LoginResponsePayload } from '../component/auth/login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { server_url } from 'src/globals';

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
    return this.httpClient.post(server_url + "/api/auth/login", body, {headers: headers})
            .pipe(
              map(data => {
                let tokens = JSON.parse(JSON.stringify(data))

                this.localStorage.store('accessToken', tokens['accessToken']);
                this.localStorage.store('refreshToken', tokens['refreshToken']);
                this.localStorage.store('username', tokens['username']);
                this.localStorage.store('expiresAt', tokens['expiresAt']);
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
      return this.httpClient.get<LoginResponsePayload>(server_url + '/api/auth/refreshToken', {headers: jwtHeader})
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
    return this.httpClient.post(server_url + "/api/auth/signUp", signupRequestPayload, {responseType: 'text'})
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  } 

  
}