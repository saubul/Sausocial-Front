import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/model/PostModel';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  posts: PostModel[];
  constructor(private postService: PostService, 
              private authService: AuthService,
              private router: Router) {

   }

  ngOnInit(): void {
  }

  filterPosts(filter: string) {
    if(!this.authService.getIsLoggedIn().value) {
      this.router.navigateByUrl('/login')
    } else{
      if(filter === "subscribed") {
        this.postService.filterPostsBySubscribed(this.authService.getUsername(), filter).subscribe(
          {
            next: (data) => this.posts = data,
            error: (error) => console.log(error)
          }
        );
      } else if(filter === "liked") {

      } else if(filter.startsWith('$')) {
        this.postService.getAllPostsByStringContains(filter.substring(1, filter.length)).subscribe(
          {
            next: (data) => this.posts = data,
            error: (error) => console.log(error)
          }
        )
      }
    }
  }

  findPostsByString(str: string) {
    this.postService.getAllPostsByStringContains(str).subscribe(
      {
        next: (data) => this.posts = data,
        error: (error) => console.log(error)
      }
    )
  }

}
