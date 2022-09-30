import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() title: string = ''

  img_src: string = '/assets/img/icon.png'

  constructor() { }

  ngOnInit(): void {
  }



}
