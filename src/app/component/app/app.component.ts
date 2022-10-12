import { Component } from '@angular/core';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'INLINE';

  constructor(private navigationService: NavigationService) {

  }

  showMenu() {
    this.navigationService.isShowMenu.next(false)
  }
}
