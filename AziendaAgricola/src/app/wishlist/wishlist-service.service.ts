import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prodotto } from '../prodotti/prodotto';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Prodotto[] = [];

  constructor() {}

  addToWishlist(prodotto: Prodotto) {
    this.wishlist.push(prodotto);
  }

  removeFromWishlist(prodotto: Prodotto) {
    const index = this.wishlist.indexOf(prodotto);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    }
  }

  getWishlist(): Observable<Prodotto[]> {
    return of(this.wishlist);
  }
}
