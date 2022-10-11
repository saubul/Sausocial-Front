import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { SubredditModel } from 'src/app/response/subreddit_response';
import { PostService } from 'src/app/service/post.service';
import { SubredditService } from 'src/app/service/subreddit.service';
import { CreatePostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel>

  constructor(private router:Router, private postService: PostService, private subredditService: SubredditService,
              private localStorage: LocalStorageService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: '',
      username: ''
    };
   }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      console.log(error)
      return new Error(error)
    })
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;
    this.postPayload.username = this.localStorage.retrieve('username')

    this.postService.createPost(this.postPayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log(error);
      return new Error(error);
    })
  }

  discard() {
    this.router.navigateByUrl('/')
  }

}
