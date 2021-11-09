import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  sub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.authService.isAuthState.subscribe(
      (authState) => {
        this.isAuth = authState;
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
  }

}
