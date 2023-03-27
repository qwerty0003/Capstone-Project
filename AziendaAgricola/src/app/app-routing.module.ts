import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { ShopComponent } from './shop/shop.component';
import { VieniATrovarciComponent } from './vieni-atrovarci/vieni-atrovarci.component';
import { DoveSiamoComponent } from './dove-siamo/dove-siamo.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'chiSiamo',
    component: ChiSiamoComponent
  },
  {
    path: 'prodotti',
    component: ProdottiComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'prenotaVisita',
    component: VieniATrovarciComponent
  },
  {
    path: 'doveSiamo',
    component: DoveSiamoComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
