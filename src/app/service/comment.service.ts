
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from '../component/post-package/view-post/comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  
  constructor(private httpClient: HttpClient) { }

  getAllCommentsByPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/getComments/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<CommentPayload> {
    return this.httpClient.post<CommentPayload>('http://localhost:8080/api/comments/create', commentPayload);
  }
}
