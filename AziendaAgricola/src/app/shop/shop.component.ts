import { Component, OnInit } from '@angular/core';
import { ProdottiServiceService } from '../prodotti-service.service';
import { Prodotto } from '../prodotti/prodotto';
import { CarrelloService } from '../carrello.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  prodotti: Prodotto[] = [];
  loaded = false;
  quantitaSelezionata: number = 1;

  constructor(
    private prodottiService: ProdottiServiceService,
    private carrelloService: CarrelloService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProdotti();
  }

  getProdotti() {
    this.prodottiService.getProducts().subscribe(
      (data) => {
        this.prodotti = data;
        this.loaded = true;
      },
      (error) => console.error(error)
    );
  }

  aggiungiAlCarrello(prodotto: Prodotto) {
    this.carrelloService.aggiungiAlCarrello(prodotto, this.quantitaSelezionata);

    console.log(this.carrelloService.getCarrello());

    let snackBarRef = this.snackBar.open(
      'Prodotto aggiunto al carrello.',
      'Visualizza carrello',
      {
        duration: 3000,
      }
    );

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/carrello']);
    });
  }
}
