import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { UtentiService } from '../utenti.service';
import { throwError } from 'rxjs';
import { Prodotto } from '../prodotti/prodotto';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  panelOpenState = false;
  wishlist: Prodotto[] = [];
  loaded = false;

  constructor(private authService: AuthService,
    private utentiService: UtentiService) { }

    ngOnInit(): void {
      const user = this.authService.getCurrentUser();
      if (user) {
        this.utentiService.getElencoUtenti().subscribe((data: any[]) => {
          const userId = data.find(u => u.email === user.username)?.id;
          if (userId) {
              this.utentiService.getWishlist(userId).subscribe((wishlist: Prodotto[]) => {
              this.wishlist = wishlist;
            });
          }
        });
      }setTimeout(() => {
          this.loaded = true;
        }, 2000);
    }

    removeItemFromWishlist(item: Prodotto) {
      const user = this.authService.getCurrentUser();
      if (user) {
        this.utentiService.getElencoUtenti().subscribe((data: any[]) => {
          const userId = data.find(u => u.email === user.username)?.id;
          if (userId) {
            this.utentiService.removeFromWishlist(userId.toString(), item.id.toString()).subscribe(() => {
              // Rimuove l'elemento dalla lista dei desideri
              this.wishlist = this.wishlist.filter(i => i !== item);
            }, error => {
              console.error(error);
            });
          }
        });
      } else {
        throwError('Errore: l\'utente non è autenticato.');
      }
    }

}
