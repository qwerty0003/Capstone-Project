import { Component, OnInit } from '@angular/core';
import { ProdottiServiceService } from '../prodotti-service.service';
import { UtentiService } from '../utenti.service';
import { AuthService } from '../auth/auth-service.service';
import { Prodotto } from './prodotto';
import { WishlistItem } from '../wishlist/wishlist-item';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss'],
})
export class ProdottiComponent implements OnInit {
  panelOpenState = false;
  prodotti: Prodotto[] = [];
  wishlistIds: Set<number> = new Set();
  wishlistItems:WishlistItem[]=[];
  wishlistReady = false;
  loaded = false;

  constructor(
    private prodottiService: ProdottiServiceService,
    private utentiService: UtentiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.prodottiService.getProducts().subscribe((data: Prodotto[]) => {
      this.prodotti = data;
      this.loaded=true;
    });

    const user = this.authService.getCurrentUser();

    if (user) {
      this.getUserId(user.username).pipe(
        switchMap((userId: string) => this.utentiService.getWishlistItems(userId))
      ).subscribe((wishlist: WishlistItem[]) => {
        this.wishlistItems = wishlist;
        this.wishlistIds = new Set(wishlist.map((item) => item.id));
        this.wishlistReady = true;
      });
    } else {
      this.wishlistReady = true;
    }


  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  addToWishlist(p: Prodotto): void {
    if (!this.isInWishlist(p)) {
      const user = this.authService.getCurrentUser();
      if (user) {
        this.getUserId(user.username)
          .pipe(
            switchMap((userId: string) =>
              this.utentiService.addProductToWishlist(userId, p.id.toString())
            )
          )
          .subscribe(() => {
            this.wishlistIds.add(p.id); // aggiunta dell'id del prodotto nella wishlist
          });
      }
    }
  }

  removeFromWishlist(p: Prodotto): void {
    if (this.isInWishlist(p)) {
      const user = this.authService.getCurrentUser();
      if (user) {
        this.getUserId(user.username)
          .pipe(
            switchMap((userId: string) =>
              this.utentiService.deleteProductFromWishlist(
                userId,
                p.id.toString()
              )
            )
          )
          .subscribe(
            () => {
              this.wishlistIds.delete(p.id); // rimozione dell'id del prodotto nella wishlist
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  isInWishlist(p: Prodotto): boolean {
    return this.wishlistIds.has(p.id); // verifica se l'id del prodotto è presente nel Set
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
