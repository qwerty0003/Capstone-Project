import { Component, OnInit } from '@angular/core';
import { ProdottiServiceService } from '../prodotti-service.service';
import { UtentiService } from '../utenti.service';
import { AuthService } from '../auth/auth-service.service';
import { Prodotto } from './prodotto';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss']
})
export class ProdottiComponent implements OnInit {

  panelOpenState = false;
  prodotti: any[];
  wishlist: any[] = [];

  constructor(
    private prodottiService: ProdottiServiceService,
    private utentiService: UtentiService,
    private authService: AuthService
  ) {
    this.prodotti = [];
  }

  ngOnInit() {
    this.prodottiService.getProducts().subscribe((data: any[]) => {
      this.prodotti = data;
    });
    const user = this.authService.getCurrentUser();
    if (user) {
      this.prodottiService.getProducts().subscribe((data: Prodotto[]) => {
        this.prodotti = data;
      });

    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  addToWishlist(p: any) {
    const user = this.authService.getCurrentUser();
    if (user) {
      const productId = p.id;
      this.utentiService.addToWishlist(user.user.id.toString(), productId.toString()).subscribe((data: any) => {
        this.wishlist.push(productId);
      });
    }
  }

  removeFromWishlist(p: any) {
    const user = this.authService.getCurrentUser();
    if (user) {
      const productId = p.id;
      this.utentiService.removeFromWishlist(user.user.id.toString(), productId.toString()).subscribe(() => {
        this.wishlist = this.wishlist.filter((id) => id !== productId);
      });
    }
  }


}
