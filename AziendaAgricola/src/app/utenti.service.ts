import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistItem } from './wishlist/wishlist-item';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  private apiUrl = 'http://localhost:3000/utenti';

  constructor(private http: HttpClient) { }

  addToWishlist(userId: string, item: WishlistItem): Observable<any> {
    const url = `${this.apiUrl}/${userId}/wishlist`;
    return this.http.post(url, item);
  }

  removeFromWishlist(userId: string, itemId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/wishlist/${itemId}`;
    return this.http.delete(url);
  }

  getWishlist(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${userId}/wishlist`;
    return this.http.get<any[]>(url);
  }

  getElencoUtenti(): Observable<any[]> {
    const url = `${this.apiUrl}/elenco`;
    return this.http.get<any[]>(url);
  }

}
