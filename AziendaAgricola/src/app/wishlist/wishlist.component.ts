
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Prodotto } from '../prodotti/prodotto';
import { WishlistService } from './wishlist-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  panelOpenState = false;
  wishlist$: Observable<Prodotto[]>;

  constructor(private wishlistService: WishlistService) {
    this.wishlist$ = new Observable<Prodotto[]>();
  }

  ngOnInit(): void {
    this.wishlist$ = this.wishlistService.getWishlist();
  }

  removeItemFromWishlist(prodotto: Prodotto) {
    this.wishlistService.removeFromWishlist(prodotto);
  }

}

