import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isAuth: boolean;

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthState.subscribe(
      (authState) => {
        this.isAuth = authState;
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

}
