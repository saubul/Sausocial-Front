import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server_url } from 'src/globals';
import { CreatePostPayload } from '../component/post-package/create-post/create-post.payload';
import { PostModel } from '../model/PostModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getAllPostsByUser(username: string) {
    return this.httpClient.get<Array<PostModel>>(server_url + '/api/post/getAllPostsByUser/' + username);
  }

  getPost(postId: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(server_url + '/api/post/' + postId);
  }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(server_url + '/api/post/getAllPosts');
  }

  createPost(postPayload: CreatePostPayload): Observable<PostModel> {
    return this.httpClient.post<PostModel>(server_url + '/api/post/create-post', postPayload);
  }

  deletePostById(postId: number) {
    let params = new HttpParams().append('postId', postId)
    this.httpClient.delete(server_url + '/api/post/delete', {params: params}).subscribe(data=>{

    },error => {
      console.log(error)
    });
  }
}

