import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { AuthData, AuthService } from '../auth/auth-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  currentUser: any;

  constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authService.getCurrentUserObservable().subscribe(user => {
      this.currentUser = user;
      this.changeDetectorRef.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
    this.changeDetectorRef.detectChanges();
  }

}
