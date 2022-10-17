import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/model/PostModel';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { CommentPayload } from '../post-package/view-post/comment.payload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string;
  posts: PostModel[];
  postsLength: number;
  comments: CommentPayload[];
  commentsLength: number;


  constructor(private activateRoute: ActivatedRoute, 
              private postService: PostService,
              private commentService: CommentService) {

    this.username = this.activateRoute.snapshot.params.username;
    this.postService.getAllPostsByUser(this.username).subscribe(data => {
      this.posts = data;
      this.postsLength = data.length;
    })
    

  }

  ngOnInit(): void {
  }

}
