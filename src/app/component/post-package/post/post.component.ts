import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/model/PostModel';
import { PostService } from 'src/app/service/post.service';
import { faComments, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  thumbsUp = faThumbsUp;
  comments = faComments;

  posts$: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(posts => {
        this.posts$ = posts;
    })
   }

  ngOnInit(): void {
  }

}
