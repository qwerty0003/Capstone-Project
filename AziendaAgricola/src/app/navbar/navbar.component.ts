import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthData, AuthService } from '../auth/auth-service.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );
  currentUser: any;
  currentUser$: Observable<any> = this.authService.getCurrentUserObservable();
  utente: AuthData|null;
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.utente = authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.utente = this.authService.getCurrentUser();
    });
  }

  logout() {
    this.authService.logout();
  }
}
