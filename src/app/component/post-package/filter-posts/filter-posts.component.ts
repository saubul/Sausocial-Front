import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-posts',
  templateUrl: './filter-posts.component.html',
  styleUrls: ['./filter-posts.component.css']
})
export class FilterPostsComponent implements OnInit {
  findFormGroup: FormGroup;
  subscribedClicked = false;
  likedClicked = false;
  @Output() filterEmitter = new EventEmitter<string>()

  constructor() { 
  }

  ngOnInit(): void {
    
    this.findFormGroup = new FormGroup(
      {
        string: new FormControl('')
      }
    )
  }

  subscribedPosts() {
    this.subscribedClicked = true;
    this.likedClicked = false;
    this.filterEmitter.emit("subscribed")
  }

  likedPosts() {
    this.subscribedClicked = false;
    this.likedClicked = true;
    this.filterEmitter.emit("liked")
  }

  findPostsByString() {
    this.subscribedClicked = false;
    this.likedClicked = false;
    this.filterEmitter.emit("$" + this.findFormGroup.get('string')?.value)
  }

}
