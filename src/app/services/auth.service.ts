import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthData } from '../shared/models/auth/auth.model';
import { AlertifyService } from './alertify.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotesService } from './notes.service';
import { UiService } from './ui.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userIdState: BehaviorSubject<string> = new BehaviorSubject('');
  isAuthState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private afAuth: AngularFireAuth,
    private noteService: NotesService,
    private uiService: UiService
  ) { }

  initAuthListener(): void {
    this.afAuth.authState
      .subscribe(user => {
        if (!user) {
          this.noteService.cancelSubs();

          this.isAuthState.next(false);
          this.userIdState.next('');

          this.router.navigateByUrl('login');
          this.uiService.stopLoading()
          return;
        }

        this.isAuthState.next(true);
        this.userIdState.next(user.uid);

        this.router.navigateByUrl('notes');
        this.uiService.stopLoading()
      })
  }

  register(user: AuthData): void {
    this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        this.alertify.success('Registered user successfully!!');
      })
      .catch(err => {
        this.alertify.error('Error when trying to register user!!');
      });
  }

  login(user: AuthData): void {
    this.afAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        this.alertify.success('Logged in successfully!!');
      })
      .catch(err => {
        this.alertify.error('Invalid email or password!!');
      });
  }

  logout(): void {
    this.uiService.startLoading()

    this.afAuth.signOut();

    this.uiService.stopLoading()
    this.alertify.success('Logged out successfully!!');
  }

}
