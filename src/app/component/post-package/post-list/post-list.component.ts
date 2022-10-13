import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/model/PostModel';
import { PostService } from 'src/app/service/post.service';
import { faComments, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  thumbsUp = faThumbsUp;
  comments = faComments;

  @Input() posts$: Array<PostModel> = [];

  constructor(private postService: PostService, private router: Router) {
    this.postService.getAllPosts().subscribe(posts => {
        this.posts$ = posts;
    })
   }

  ngOnInit(): void {
  }
  goToPost(postId: number) {
    this.router.navigateByUrl('/view-post/' + postId)
  }
}
