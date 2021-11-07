import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../shared/models/auth/auth.mode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: AuthData;
  isAuthState: Subject<boolean> = new Subject();

  constructor(private router: Router) { }

  register(user: AuthData): void {
    this.user = user;

    this.isAuthState.next(true);
    this.router.navigateByUrl('notes');
  }

  login(user: AuthData): void {
    this.user = user;

    this.isAuthState.next(true);
    this.router.navigateByUrl('notes');
  }

  logout(): void {
    this.user = null;

    this.isAuthState.next(false);
    this.router.navigateByUrl('login');
  }

  isAuth(): boolean {
    return this.user != null;
  }

}
