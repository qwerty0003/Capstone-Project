import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../prodotti/prodotto';
import { CarrelloService } from '../carrello.service';
import { AuthService } from '../auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {
  carrello: { prodotto: Prodotto, quantita: number }[] = [];
  loaded = false;
  loggedIn = false;

  constructor(private carrelloService: CarrelloService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.carrello = this.carrelloService.getCarrello();
    if(this.auth.isLoggedIn()){
      this.loggedIn = true;
    }
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

  rimuoviDalCarrello(index: number) {
    this.carrelloService.rimuoviDalCarrello(index);
  }

  getTotale() {
    return this.carrelloService.getTotale();
  }

  confermaAcquisto() {
    this.router.navigate(['/checkout']);
  }
}
