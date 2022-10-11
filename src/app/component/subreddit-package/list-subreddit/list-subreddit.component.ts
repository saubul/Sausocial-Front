import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { SubredditModel } from 'src/app/response/subreddit_response';
import { SubredditService } from 'src/app/service/subreddit.service';

@Component({
  selector: 'app-list-subreddit',
  templateUrl: './list-subreddit.component.html',
  styleUrls: ['./list-subreddit.component.css']
})
export class ListSubredditComponent implements OnInit {

  constructor(private subredditService: SubredditService) {}
  subreddits: Array<SubredditModel>;


  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      return new Error(error)
    })
  }

}
