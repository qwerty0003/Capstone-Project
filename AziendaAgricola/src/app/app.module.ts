import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { ShopComponent } from './shop/shop.component';
import { VieniATrovarciComponent } from './vieni-atrovarci/vieni-atrovarci.component';
import { DoveSiamoComponent } from './dove-siamo/dove-siamo.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { AppointmentFormComponent } from './vieni-atrovarci/appointment-form/appointment-form.component';
import { AuthModule } from './auth/auth/auth.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProdottiComponent,
    ShopComponent,
    VieniATrovarciComponent,
    DoveSiamoComponent,
    WishlistComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    AppointmentFormComponent,
    SpinnerComponent,
    ChiSiamoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    AuthModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
