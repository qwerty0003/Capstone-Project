import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private baseUrl = 'http://localhost:3000/utenti';

  constructor(private http: HttpClient) {}

  getWishlist(userId: string) {
    return this.http.get(`${this.baseUrl}/${userId}/wishlist`);
  }

  addToWishlist(userId: string, productId: string) {
    return this.http.post(`${this.baseUrl}/${userId}/wishlist`, { id: productId });
  }

  removeFromWishlist(userId: string, productId: string) {
    return this.http.delete(`${this.baseUrl}/${userId}/wishlist/${productId}`);
  }
}
