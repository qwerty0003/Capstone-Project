import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupUrl = 'http://localhost:3000/api/signup'; // url del backend

  constructor(private http: HttpClient) { }

  signup(data: any) {
    return this.http.post<any>(this.signupUrl, data);
  }

}

