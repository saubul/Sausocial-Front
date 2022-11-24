import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { PostModel } from 'src/app/model/PostModel';
import { SubscriptionModel } from 'src/app/model/SubscriptionModel';
import { UserModel } from 'src/app/model/UserModel';
import { AuthService } from 'src/app/service/auth.service';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { SubcriptionService } from 'src/app/service/subcription.service';
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

  isOwner: boolean;
  isSubscribed: boolean;
  constructor(private activateRoute: ActivatedRoute, 
              private postService: PostService,
              private commentService: CommentService,
              private userService: UserService,
              private router: Router,
              private localStorage: LocalStorageService,
              private authService: AuthService,
              private subscriptionService: SubcriptionService) {

    this.username = this.activateRoute.snapshot.params.username;
    this.postService.getAllPostsByUser(this.username).subscribe(data => {
      this.posts = data;
      this.postsLength = data.length;
    })
    this.userService.getUserByUsername(this.username).subscribe(
      {
        next: (data) => this.user = data,
        error: (error) => console.log(error) 
      }
    )
    this.isOwner = this.checkIsOwner();
    this.checkIsSubscribed()
  }

  subscribe() {
    if(!this.authService.getIsLoggedIn().value) {
      this.router.navigateByUrl('/login')
    } else {
      let subscription = new SubscriptionModel()
      subscription.ownerUsername = this.localStorage.retrieve('username')
      subscription.subscriberUsername = this.username
      this.subscriptionService.subscribe(subscription).subscribe(
        {
          next: () => {this.isSubscribed = true},
          error: (error) => console.log(error)
        }
      )
    }
  }

  checkIsOwner(): boolean {
    if(!this.authService.getIsLoggedIn().value) {
      return false;
    } else {
      if(this.localStorage.retrieve('username') === this.username) {
        return true;
      }
      return false;
    }
  }

  checkIsSubscribed() {
    if(!this.authService.getIsLoggedIn().value) {
      this.isSubscribed = false;
    } else {
      let subscription = new SubscriptionModel()
      subscription.ownerUsername = this.localStorage.retrieve('username')
      subscription.subscriberUsername = this.username
      this.subscriptionService.isSubcribed(subscription).subscribe(
        {
          
          next: (data) => {
            this.isSubscribed = data
            console.log(data)
          },
          error: (error) => console.log(error)
        }
      )
    }
  }

  unsubscribe() {
    let subscription = new SubscriptionModel()
    subscription.ownerUsername = this.localStorage.retrieve('username')
    subscription.subscriberUsername = this.username
    this.subscriptionService.unsubscribe(subscription).subscribe(
      {
        next: () => {},
        error: (error) => {
          this.isSubscribed = false;
          console.log(error)

        }
      }
    )
  }

  ngOnInit(): void {
  }

}
