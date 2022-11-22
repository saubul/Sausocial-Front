import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/model/PostModel';
import { UserModel } from 'src/app/model/UserModel';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
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
  user: UserModel

  constructor(private activateRoute: ActivatedRoute, 
              private postService: PostService,
              private commentService: CommentService,
              private userService: UserService) {

    this.username = this.activateRoute.snapshot.params.username;
    this.postService.getAllPostsByUser(this.username).subscribe(data => {
      this.posts = data;
      this.postsLength = data.length;
    })
    userService.getUserByUsername(this.username).subscribe(data => {
      this.user = data
    }, error => {
      console.log(error)
    })

  }

  ngOnInit(): void {
  }

}
