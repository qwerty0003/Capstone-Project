import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  private apiUrl = 'https://api.example.com/utenti';

  constructor(private http: HttpClient) { }

  addToWishlist(userId: string, productId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/wishlist`;
    return this.http.post(url, { productId });
  }

  removeFromWishlist(userId: string, productId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/wishlist/${productId}`;
    return this.http.delete(url);
  }

  getWishlist(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${userId}/wishlist`;
    return this.http.get<any[]>(url);
  }
}
