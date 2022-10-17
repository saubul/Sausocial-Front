import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  goToCreatePost() {
    if(!this.authService.getIsLoggedIn().value) {
      this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl('/create-post');
    }
  }

  goToCreateSubreddit() {
    if(!this.authService.getIsLoggedIn().value) {
      this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl('/create-subreddit');
    }
  }

}
