import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { PostModel } from 'src/app/model/PostModel';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { CommentPayload } from './comment.payload';
import { faArrowCircleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];

  arrow = faArrowCircleRight;

  constructor(private postService: PostService, 
              private activateRoute: ActivatedRoute,
              private commentService: CommentService,
              private router: Router,
              private localStorage: LocalStorageService) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: '',
      postId: this.postId,
      username: '',
      duration: new Date()
    }

    
   }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsByPost();
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentPayload.username = this.localStorage.retrieve('username');
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      this.getCommentsByPost();
    }, error => {
      console.log(error)
    })
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      console.log(error)
    })
  }


  private getCommentsByPost() {
    this.commentService.getAllCommentsByPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      console.log(error)
      return new Error(error)
    })
  }
}
