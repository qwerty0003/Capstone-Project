import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chi-siamo',
  templateUrl: './chi-siamo.component.html',
  styleUrls: ['./chi-siamo.component.scss']
})
export class ChiSiamoComponent implements OnInit {

  loaded = false;
  constructor() { }
  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }


}
