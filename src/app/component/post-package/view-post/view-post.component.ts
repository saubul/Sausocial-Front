import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { PostModel } from 'src/app/model/PostModel';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { CommentPayload } from './comment.payload';
import { faArrowCircleRight, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/service/auth.service';
import { VoteService } from 'src/app/service/vote.service';
import { VotePayload } from './vote.payload';
import { VoteType } from './vote-type';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  thumbsUp = faThumbsUp;
  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  isLiked: boolean;

  arrow = faArrowCircleRight;

  voteForm: FormGroup
  votePayload: VotePayload
  voteNumber: number

  usernameMatch: boolean

  constructor(private postService: PostService, 
              private activateRoute: ActivatedRoute,
              private commentService: CommentService,
              private router: Router,
              private localStorage: LocalStorageService,
              private authService: AuthService,
              private voteService: VoteService) {
    
    this.postId = this.activateRoute.snapshot.params.id;
    this.isLikedByUser()
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });


    this.voteForm = new FormGroup({

    })

    this.commentPayload = {
      text: '',
      postId: this.postId,
      username: '',
      dateCreated: new Date()
    }

    this.votePayload = {
      voteType: VoteType.NEUTRAL,
      postId: 1
    }
   }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsByPost();
  }

  postComment() {
    if(!this.authService.getIsLoggedIn().value) {
      this.router.navigateByUrl('/login')
    } else {

      this.commentPayload.text = this.commentForm.get('text')?.value;
      this.commentPayload.username = this.localStorage.retrieve('username');
      this.commentService.postComment(this.commentPayload).subscribe(data => {
        this.commentForm.get('text')?.setValue('');
        this.getCommentsByPost();
      }, error => {
        console.log(error)
      })
    }
  }

  votePost() {
    if(!this.authService.getIsLoggedIn().value) {
      this.router.navigateByUrl('/login')
    } else {
      var username = this.localStorage.retrieve('username')
      this.votePayload.postId = this.postId
      this.votePayload.voteType = VoteType.UPVOTE
      this.voteService.vote(this.votePayload).subscribe(data => {
          this.getPostById()
          this.isLikedByUser()
      },error => {
        console.log(error)
      })
    }
  }

  deletePost(postId: number) {
    this.postService.deletePostById(postId).subscribe({
      next: () => { },
      error: (error) => { this.router.navigateByUrl('/');
      console.log(error)}
    });
    
  }

  private checkUsernameMatch(): boolean {
    if(!this.authService.getIsLoggedIn().value) {
      return false;
    } else {
      let usernameStorage = this.localStorage.retrieve('username')
      if(usernameStorage === this.post.username) {
        return true;
      }
      return false;
    }
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
      this.usernameMatch = this.checkUsernameMatch();
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

  private isLikedByUser() {
    if(!this.authService.getIsLoggedIn().value) {
      this.isLiked = false;
    } else {
      this.voteService.isLikedPostByUser(this.postId, this.localStorage.retrieve('username')).subscribe(data => {
        this.isLiked = data;
      }, error => {
        console.log(error)
      });
    }
  }

}
