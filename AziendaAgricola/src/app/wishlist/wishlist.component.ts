import { Component } from '@angular/core';
import { WishlistService } from './wishlist-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  panelOpenState = false;

  constructor(private wishlistService: WishlistService) {}

  addToWishlist() {
    const prodotto = { nome: 'Avocado', prezzo: 2.99 };
    this.wishlistService.addToWishlist(prodotto).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
