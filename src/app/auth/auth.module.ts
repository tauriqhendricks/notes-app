import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    AngularFireAuthModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
