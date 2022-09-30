import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/model/PostModel';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts$: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(posts => {
        this.posts$ = posts;
    })
   }

  ngOnInit(): void {
  }

}
