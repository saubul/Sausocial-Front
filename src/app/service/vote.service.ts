import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server_url } from 'src/globals';
import { VotePayload } from '../component/post-package/view-post/vote.payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) {

  }

  vote(votePayload: VotePayload) {
    return this.http.post(server_url + '/api/votes/vote', votePayload);
  }

  isLikedPostByUser(postId: number, username: string): Observable<boolean> {
    let params = new HttpParams().append('postId', postId).append('username', username)
    return this.http.get<boolean>(server_url + '/api/votes/isLiked', { params: params })
  }
}
