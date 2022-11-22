import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server_url } from 'src/globals';
import { UserModel } from '../model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(server_url + '/api/user?username=' + username);
  }
}
