import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../component/post-package/create-post/create-post.payload';
import { PostModel } from '../model/PostModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getAllPostsByUser(username: string) {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/post/getAllPosts/' + username);
  }

  getPost(postId: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>('http://localhost:8080/api/post/' + postId);
  }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/post/getAllPosts');
  }

  createPost(postPayload: CreatePostPayload): Observable<PostModel> {
    return this.httpClient.post<PostModel>('http://localhost:8080/api/post/create-post', postPayload);
  }
}

