import { Injectable } from '@angular/core';
import { Prodotto } from './prodotti/prodotto';

@Injectable({
  providedIn: 'root',
})
export class CarrelloService {
  private items: { prodotto: Prodotto; quantita: number }[] = [];

  constructor() {
    this.caricaCarrello();
  }

  aggiungiAlCarrello(prodotto: Prodotto, quantita: number) {
    const item = this.items.find((item) => item.prodotto.id === prodotto.id);
    if (item) {
      item.quantita += quantita;
    } else {
      this.items.push({ prodotto, quantita });
    }
    this.salvaCarrello();
  }

  rimuoviDalCarrello(id: number) {
    const index = this.items.findIndex((item) => item.prodotto.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.salvaCarrello();
    }
  }

  svuotaCarrello() {
    this.items = [];
    this.salvaCarrello();
  }

  getCarrello() {
    return this.items;
  }

  getTotale() {
    return this.items.reduce(
      (totale, item) => totale + item.prodotto.prezzo * item.quantita,
      0
    );
  }

  // Salva i dati del carrello in sessionStorage
  private salvaCarrello() {
    sessionStorage.setItem('carrello', JSON.stringify(this.items));
  }

  // Carica i dati del carrello da sessionStorage
  private caricaCarrello() {
    const carrello = sessionStorage.getItem('carrello');
    if (carrello) {
      this.items = JSON.parse(carrello);
    }
  }
}
