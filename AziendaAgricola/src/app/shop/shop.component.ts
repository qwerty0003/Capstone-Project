import { Component, OnInit } from '@angular/core';
import { ProdottiServiceService } from '../prodotti-service.service';
import { Prodotto } from '../prodotti/prodotto';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  prodotti: Prodotto[] = [];
  loaded = false;

  constructor(private prodottiService: ProdottiServiceService) {}

  ngOnInit() {
    this.getProdotti();

    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

  getProdotti() {
    this.prodottiService.getProducts().subscribe(
      (data) => {
        this.prodotti = data;
      },
      (error) => console.error(error)
    );
  }

  aggiungiAlCarrello(prodotto: Prodotto) {
    console.log('Aggiunto al carrello: ', prodotto.nome);
    // aggiungi il prodotto al carrello
  }
}
