import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { faker } from '@faker-js/faker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarrelloService } from '../carrello.service';

interface CheckoutData {
  name: string;
  email: string;
  phoneNumber: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  products: {
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
}


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  user = this.auth.getCurrentUser();

  checkoutForm: FormGroup;
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  checkoutData?: CheckoutData;

  cartItems: any[] = [];

  buyerInfo = {
    name: faker.name.fullName(),
    email: this.user?.username,
    phone: faker.phone.number('+39 ### ## ## ###'),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode()
  };
  shippingAddress = {
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode()
  };

  paymentMethod = 'Credit Card';

  orderSummary: { name: string; price: number; quantity: number; }[]=[];

  subtotal: number=0;
  shippingFee: number=5;
  total: number=0;
  loaded = false;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private cart: CarrelloService) {
    this.checkoutForm = this.formBuilder.group({
      name: [this.buyerInfo.name, Validators.required],
      email: [this.buyerInfo.email, Validators.compose([Validators.required, Validators.email])],
      phone: [this.buyerInfo.phone, Validators.required],
      address: [this.buyerInfo.address, Validators.required],
      city: [this.buyerInfo.city, Validators.required],
      state: [this.buyerInfo.state, Validators.required],
      zip: [this.buyerInfo.zip, Validators.required]
    });
    this.shippingForm = this.formBuilder.group({
      shippingAddress: [this.shippingAddress.address, Validators.required],
      shippingCity: [this.shippingAddress.city, Validators.required],
      shippingState: [this.shippingAddress.state, Validators.required],
      shippingZip: [this.shippingAddress.zip, Validators.required],
    });
    this.paymentForm = this.formBuilder.group({
      paymentMethod: ['', Validators.required]
    });
    setTimeout(() => {
      this.loaded = true;
    }, 3000);
   }

   ngOnInit() {
    this.cartItems = this.cart.getCarrello();
    console.log(this.cartItems);

    for (let item of this.cartItems) {
      let product = {
        name: item.name,
        price: item.price,
        quantity: item.quantity
      };
      this.orderSummary.push(product);
    }
    this.subtotal = this.cart.getTotale();
    this.total = this.subtotal + this.shippingFee
  }

  onSubmit() {
    /*  name: string;
    email: string;
    phoneNumber: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    paymentMethod: string;
    products: {
      name: string;
      price: number;
    quantity: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
}*/
this.checkoutData = {
  name: this.checkoutForm.get('name')!.value,
  email: this.checkoutForm.get('email')!.value,
  phoneNumber: this.checkoutForm.get('phone')!.value,
  shippingAddress: {
    street: this.shippingForm.get('shippingAddress')!.value,
    city: this.shippingForm.get('shippingCity')!.value,
    state: this.shippingForm.get('shippingState')!.value,
    zipCode: this.shippingForm.get('shippingZip')!.value,
    country: 'Italy' // se il paese è sempre Italia, puoi hardcodarlo qui
  },
  paymentMethod: this.paymentForm.get('paymentMethod')!.value,
  products: this.orderSummary,
  subtotal: this.subtotal,
      shippingFee: this.shippingFee,
      total: this.subtotal + this.shippingFee
    };
    this.cart.svuotaCarrello();
    console.log(this.checkoutData);

  }

}
