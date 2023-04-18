import { Component, OnInit } from '@angular/core';
import { ProdottiServiceService } from '../prodotti-service.service';
import { Prodotto } from '../prodotti/prodotto';
import { CarrelloService } from '../carrello.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  prodotti: Prodotto[] = [];
  loaded = false;
  quantitaSelezionata: number = 1;

  constructor(private prodottiService: ProdottiServiceService, private carrelloService: CarrelloService) {}

  ngOnInit() {
    this.getProdotti();
  }

  getProdotti() {
    this.prodottiService.getProducts().subscribe(
      (data) => {
        this.prodotti = data;
        this.loaded=true;
      },
      (error) => console.error(error)
    );
  }

  aggiungiAlCarrello(prodotto: Prodotto) {
    this.carrelloService.aggiungiAlCarrello(prodotto, this.quantitaSelezionata);
    console.log(this.carrelloService.getCarrello());
  }
}
