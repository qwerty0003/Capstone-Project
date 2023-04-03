import { Component, OnInit } from '@angular/core';
import { ProdottiServiceService } from '../prodotti-service.service';
import { UtentiService } from '../utenti.service';
import { AuthService } from '../auth/auth-service.service';
import { Prodotto } from './prodotto';
import { WishlistItem } from '../wishlist/wishlist-item';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss']
})
export class ProdottiComponent implements OnInit {

  panelOpenState = false;
  prodotti: Prodotto[] = [];
  wishlist: Prodotto[] = [];

  constructor(
    private prodottiService: ProdottiServiceService,
    private utentiService: UtentiService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.prodottiService.getProducts().subscribe((data: Prodotto[]) => {
      this.prodotti = data;
    });

    const user = this.authService.getCurrentUser();
    if (user) {
      this.utentiService.getElencoUtenti().subscribe((data: any[]) => {
        const userId = data.find(u => u.email === user.username)?.id;
        if (userId) {
          this.utentiService.getWishlist(userId).subscribe((wishlist: WishlistItem[]) => {
            this.wishlist = wishlist;
          });
        }
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  addToWishlist(p: Prodotto): void {
    if (!this.isInWishlist(p)) {
      const user = this.authService.getCurrentUser();
      if (user) {
        const userId$ = this.getUserId(user.username);
        userId$.subscribe((userId) => {
          if (userId) {
            const wishlistItem: WishlistItem = {
              id: p.id,
              nome: p.nome,
              descrizione: p.descrizione,
              prezzo: p.prezzo,
              disponibilita: p.disponibilita,
              qnt_disponibile: p.qnt_disponibile,
              qnt_vendita: p.qnt_vendita,
              condizioni_conservazione: p.condizioni_conservazione,
              suggerimenti_uso: p.suggerimenti_uso,
              img: p.img,
              img_mobile: p.img_mobile
            };
            this.utentiService.addToWishlist(userId, wishlistItem).subscribe(() => {
              this.wishlist.push(wishlistItem);
            });
          }
        });
      }
    }
  }

  removeFromWishlist(p: Prodotto): void {
    if (this.isInWishlist(p)) {
      const user = this.authService.getCurrentUser();
      if (user) {
        this.getUserId(user.username).subscribe((userId) => {
          if (userId) {
            const wishlistItem = this.wishlist.find(item => item.id === p.id);
            if (wishlistItem) {
              this.utentiService.removeFromWishlist(userId, wishlistItem.id.toString()).subscribe(() => {
                this.wishlist = this.wishlist.filter(item => item.id !== p.id); // rimuove dalla wishlist solo se la rimozione dal DB è andata a buon fine
              }, (error) => {
                console.log(error);
              });
            }
          }
        }, (error) => {
          console.log(error);
        });
      }
    }
  }



  isInWishlist(p: Prodotto): boolean {
    return this.wishlist.some(item => item.id === p.id);
  }

  private getUserId(email: string): Observable<string> {
    return this.utentiService.getElencoUtenti().pipe(
      map((data: any[]) => {
        const user = data.find(u => u.email === email);
        return user ? user.id : undefined;
      })
    );
  }


}
