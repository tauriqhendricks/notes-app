import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Utils } from 'src/app/shared/helper/utils.model';
import { AuthData } from 'src/app/shared/models/auth/auth.mode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // th:note add notification

  form: FormGroup;
  user: AuthData;

  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.user = new AuthData();
    this.createForm();

    this.isLoading = false;
  }

  createForm(): void {
    this.form = this.fb.group({
      email: [this.user.email || '', [Validators.required, Validators.email]],
      password: [this.user.password || '', Validators.required]
    });
  }

  onSubmit(): void {
    this.trimStrings();
    this.form.markAllAsTouched();

    if (this.form.invalid)
      return;

    this.isLoading = true;

    this.user = this.mapAuthDataFromForm();
    this.authService.login(this.user);

    this.isLoading = false;
  }

  trimStrings(): void {
    const emailControl = this.form.get('email');

    emailControl?.setValue(emailControl?.value.toString().trim());
  }

  mapAuthDataFromForm(): AuthData {
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');

    const authData: AuthData = {

      email: emailControl.value.toString(),
      password: passwordControl.value.toString()

    }

    return authData;
  }

  isInvalid(controlName: string): boolean {
    return Utils.isFormControlInvalid(controlName, this.form);
  }

  isInvalidError(controlName: string, error: string): boolean {
    return Utils.isFormControlInvalidError(controlName, error, this.form);
  }

}
