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
  utente: AuthData|null= this.authService.getCurrentUser();
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
