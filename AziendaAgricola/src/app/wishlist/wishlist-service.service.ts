import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistUrl = 'http://localhost:3000/wishlist';

  constructor(private http: HttpClient) {}
 //va cambiato
  addToWishlist(prodotto: any): Observable<any> {
    return this.http.post<any>(this.wishlistUrl, prodotto);
  }
}

