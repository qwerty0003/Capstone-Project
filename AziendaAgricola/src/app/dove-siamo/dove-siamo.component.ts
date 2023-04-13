import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dove-siamo',
  templateUrl: './dove-siamo.component.html',
  styleUrls: ['./dove-siamo.component.scss']
})
export class DoveSiamoComponent implements OnInit {

  loaded = false

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 3000);
  }

}
