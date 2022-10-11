import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/model/PostModel';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute) {
    this.postId = this.activateRoute.snapshot.params.id;
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      console.log(error)
      return new Error(error)
    })
   }

  ngOnInit(): void {
  }



}
