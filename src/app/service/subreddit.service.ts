import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditModel } from '../response/subreddit_response';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private httpClient: HttpClient) {

  }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit/getAllSubreddits');
     
  }

  createSubreddit(subreddit: SubredditModel): Observable<SubredditModel> {
    return this.httpClient.post<SubredditModel>('http://localhost:8080/api/subreddit/create', subreddit);
  }

}
