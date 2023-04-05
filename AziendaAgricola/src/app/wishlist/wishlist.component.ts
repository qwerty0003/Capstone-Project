import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { UtentiService } from '../utenti.service';
import {
  throwError,
  map,
  switchMap,
  combineLatest,
  of,
  Observable,
} from 'rxjs';
import { Prodotto } from '../prodotti/prodotto';
import { WishlistItem } from './wishlist-item';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  panelOpenState = false;
  wishlist: WishlistItem[] = [];
  loaded = false;

  constructor(
    private authService: AuthService,
    private utentiService: UtentiService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.getUserId(user.username).subscribe((userId) => {
          if (userId) {
            this.utentiService.getWishlistItems(userId).subscribe((wishlist) => {
              this.wishlist = wishlist;
            });
          }
        });
      }
    });
    console.log(this.wishlist);

    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

  removeItem(product: WishlistItem): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.getUserId(user.username).subscribe((userId) => {
          if (userId) {
            this.utentiService
              .deleteProductFromWishlist(userId, product.id.toString())
              .subscribe(() => {
                this.wishlist = this.wishlist.filter(
                  (item) => item.id !== product.id
                );
              });
          }
        });
      }
    });
  }

  private getUserId(email: string): Observable<string> {
    return this.utentiService.getElencoUtenti().pipe(
      map((data: any[]) => {
        const user = data.find((u) => u.email === email);
        return user ? user.id : undefined;
      })
    );
  }
}
