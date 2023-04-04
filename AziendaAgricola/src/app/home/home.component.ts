import { Component, OnInit } from '@angular/core';
import { ProdottiServiceService } from '../prodotti-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loaded = false;
  prodotti:any;

  constructor(private prodottiService: ProdottiServiceService) { }

  ngOnInit(): void {
    this.prodottiService.getProducts().subscribe((data) => {
      this.prodotti = data;
    });
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

}
