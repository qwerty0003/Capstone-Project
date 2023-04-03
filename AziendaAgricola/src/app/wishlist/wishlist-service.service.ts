import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WishlistItem } from './wishlist-item';
import { AuthService } from '../auth/auth-service.service';

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
export class WishlistService {

  constructor(private http: HttpClient) { }

  getWishlist(userId: string): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`/api/users/${userId}/wishlist`);
  }

  addWishlistItem(userId: string, item: WishlistItem): Observable<any> {
    return this.http.post(`/api/users/${userId}/wishlist`, item);
  }

  removeWishlistItem(userId: string, itemId: string): Observable<any> {
    return this.http.delete(`/api/users/${userId}/wishlist/${itemId}`);
  }

}
