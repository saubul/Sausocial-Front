import { Component, Input, OnInit  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faThumbsDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/service/auth.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string;
  isShowMenu: boolean = false;
  faUser = faUser;
  @Input() title: string = ''

  img_src: string = '/assets/img/icon.png'

  constructor(private authService: AuthService,
              private router: Router,
              private navigationService: NavigationService,
              private postService: PostService) {
      this.navigationService.isShowMenu.subscribe(data => {
        this.isShowMenu = this.navigationService.isShowMenu.getValue()
      })
      this.authService.getIsLoggedIn().subscribe(data => {
       this.isLoggedIn = this.authService.getIsLoggedIn().getValue()
      })
  }

  ngOnInit(): void {
    this.isShowMenu = false;
    this.username = this.authService.getUsername();

  }

  routeToMain() {
    if(this.router.url == '/') {
      window.location.reload();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile' + this.username)
  }

  logout() {
    this.navigationService.showMenu();
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }

  showMenu() {
    this.username = this.authService.getUsername();
    this.navigationService.showMenu();
  }

}
