
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { switchMap,take } from 'rxjs/operators';
import { WishlistService } from './wishlist-service.service';
import { WishlistItem } from './wishlist-item';
import { AuthService } from '../auth/auth-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  panelOpenState = false;
  wishlist: WishlistItem[] = [];

  constructor(private authService: AuthService, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    console.log(user); // Verifica il valore di user
    if (user) {
      this.wishlistService.getWishlist(user.user.id.toString()).subscribe((data: WishlistItem[]) => {
        this.wishlist = data;
      });
    }
  }
    //   this.authService.getCurrentUserObservable().subscribe(user => {
  //     if (user && user.user.id) {
  //       this.wishlistService.getWishlist(user.user.id.toString()).subscribe(wishlist => {
  //         this.wishlist = wishlist;
  //       });
  //     } else {
  //       this.wishlist = [];
  //     }
  //   });
  // }

  removeItemFromWishlist(item: WishlistItem) {
    const user = this.authService.getCurrentUserObservable();
    user.pipe(
      take(1),
      switchMap(userData => {
        if (userData && userData.user) {
          return this.wishlistService.removeWishlistItem(userData.user.id.toString(), item.id.toString());
        } else {
          return throwError('Errore: l\'utente non è autenticato.');
        }
      })
    ).subscribe(() => {
      // Aggiorna la lista dei desideri dopo la rimozione dell'elemento
      this.wishlist = this.wishlist.filter(i => i !== item);
    }, error => {
      console.error(error);
    });
  }

}

