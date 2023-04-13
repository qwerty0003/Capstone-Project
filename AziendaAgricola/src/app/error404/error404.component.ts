import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  loaded=false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

}
