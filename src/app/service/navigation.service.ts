import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  isShowMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { 
    this.isShowMenu = new BehaviorSubject<boolean>(false);
  }

  showMenu() {
    this.isShowMenu.next(!this.isShowMenu.getValue())
  }
}
