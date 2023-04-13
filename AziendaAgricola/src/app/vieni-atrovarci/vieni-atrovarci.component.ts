import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vieni-atrovarci',
  templateUrl: './vieni-atrovarci.component.html',
  styleUrls: ['./vieni-atrovarci.component.scss']
})
export class VieniATrovarciComponent implements OnInit {

  selected = Date;
  loaded=false;

  constructor() {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

}
