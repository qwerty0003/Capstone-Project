import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError,Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface SignupData {
  nome: string;
  cognome: string;
  email: string;
  password: string;
}

export interface AuthData {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string = 'http://localhost:3000/api/auth/';
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));
  autoLogoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  login(data: LoginData) {

    return this.http.post<AuthData>(`${this.URL}signin`, data).pipe(
      tap((data) => {
        localStorage.setItem('user', JSON.stringify(data));

        const expirationDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 1 settimana
        this.autoLogout(expirationDate);

        this.authSubj.next(data);
        this.router.navigate(['/']);
      }),
      catchError(this.errors)
    );
  }

  signup(data: SignupData) {
    this.router.navigate(['/login']);
    return this.http
    .post(`${this.URL}signup`, data)
    .pipe(catchError(this.errors));
  }

  logout() {
    console.log('Logout clicked');
    this.authSubj.next(null); //segnalare al sito che non siamo più loggati
    this.router.navigate(['/']);
    localStorage.removeItem('user'); //dimentichiamo il token per evitare autologin
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
  }


  restoreUser() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const user: AuthData = JSON.parse(userJson);
    if (!user.accessToken) {
      return;
    }
    this.authSubj.next(user);
    const expirationDate = this.getExpirationDateFromToken(user.accessToken);
    this.autoLogout(expirationDate.getTime());

}

private getExpirationDateFromToken(token: string): Date {
  const jwtPayload = token.split('.')[1];
  const jwtPayloadDecoded = atob(jwtPayload);
  const payloadObject = JSON.parse(jwtPayloadDecoded);
  const expirationTimestamp = payloadObject.exp;
  if (!expirationTimestamp) {
    return new Date(); // restituisce la data corrente se la proprietà 'exp' non esiste
  }
  return new Date(expirationTimestamp * 1000);
}



  autoLogout(expirationDate: number) {
  const expMs = expirationDate - new Date().getTime();
  this.autoLogoutTimer = setTimeout(() => {
    this.logout();
  }, expMs);
}


  private errors(err: any) {
    switch (err.error) {
      case 'Email and password are required':
        alert('Email e password sono obbligatorie');
        throw new Error('Email e password sono obbligatorie');
        break;
      case 'Email already exists':
        alert('Utente già registrato');
        return throwError('Utente già registrato');
        break;
      case 'Email format is invalid':
        alert('Email scritta male');
        return throwError('Email scritta male');
        break;
      case 'Cannot find user':
        alert("L'utente non esiste");
        return throwError("L'utente non esiste");
        break;
      default:
        alert('Errore nella chiamata');
        return throwError('Errore nella chiamata');
        break;
    }
  }

  isLoggedIn() {
    return !!this.authSubj.getValue();
  }

  getCurrentUser() {
    const storedUserJson = localStorage.getItem('user');
    if (storedUserJson) {
      const storedUser: AuthData = JSON.parse(storedUserJson);
      if (storedUser && storedUser.accessToken) {
        const expirationDate = this.getExpirationDateFromToken(storedUser.accessToken);
        if (new Date().getTime() < expirationDate.getTime()) {
          // token is still valid
          return storedUser;
        } else {
          // token is expired
          localStorage.removeItem('user');
          return null;
        }
      }
    }
    return null;
  }

  getCurrentUserObservable(): Observable<AuthData | null> {
    // Ritorna un Observable che emette il valore corrente di currentUser e poi
    // completa l'Observable quando l'istanza di AuthService viene distrutta
    return new Observable((observer) => {
      observer.next(this.getCurrentUser());
      observer.complete();
    });
  }

}
