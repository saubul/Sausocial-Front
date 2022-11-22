import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server_url } from 'src/globals';
import { SubredditModel } from '../response/subreddit_response';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private httpClient: HttpClient) {

  }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>(server_url + '/api/subreddit/getAllSubreddits');
     
  }

  createSubreddit(subreddit: SubredditModel): Observable<SubredditModel> {
    return this.httpClient.post<SubredditModel>(server_url + '/api/subreddit/create', subreddit);
  }

}
