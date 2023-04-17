import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdottiServiceService {

  private baseUrl = 'https://my-capstone-web-server.osc-fr1.scalingo.io/prodotti-agricoli';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);

  }
}
