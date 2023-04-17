import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, forkJoin } from 'rxjs';
import { WishlistItem } from './wishlist/wishlist-item';

export interface User {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private baseUrl = 'https://my-capstone-web-server.osc-fr1.scalingo.io/utenti';
  private productsUrl = 'https://my-capstone-web-server.osc-fr1.scalingo.io/prodotti-agricoli';

  constructor(private http: HttpClient) {}

  getWishlist(id: string): Observable<Set<number>> {
    return this.http.get<Set<number>>(`${this.baseUrl}/${id}/wishlist`);
  }

  addProductToWishlist(id: string, productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/add/${productId}`, null);
  }

  deleteProductFromWishlist(id: string, productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/remove/${productId}`, null);
  }

  getElencoUtenti(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/elenco`);
  }

  getProducts(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.productsUrl}`);
  }

  getWishlistItems(id: string): Observable<WishlistItem[]> {
    return forkJoin({
      wishlist: this.getWishlist(id),
      products: this.getProducts()
    }).pipe(
      map(({wishlist, products}) =>
        products.filter((product) => [...wishlist].includes(product.id))
          .map((product) => new WishlistItem(
            product.id,
            product.nome,
            product.descrizione,
            product.prezzo,
            product.disponibilita,
            product.qnt_disponibile,
            product.qnt_vendita,
            product.condizioni_conservazione,
            product.suggerimenti_uso,
            product.img,
            product.img_mobile
          ))
      )
    );
  }

}
