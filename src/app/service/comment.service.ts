
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server_url } from 'src/globals';
import { CommentPayload } from '../component/post-package/view-post/comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  
  constructor(private httpClient: HttpClient) { }

  getAllCommentsByPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(server_url + '/api/comments/getComments/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<CommentPayload> {
    return this.httpClient.post<CommentPayload>(server_url + '/api/comments/create', commentPayload);
  }
}
