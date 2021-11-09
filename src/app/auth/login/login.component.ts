import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { Utils } from 'src/app/shared/helper/utils.model';
import { AuthData } from 'src/app/shared/models/auth/auth.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  user: AuthData;

  isLoading: boolean = false;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UiService) { }

  ngOnInit(): void {
    this.sub = this.uiService.isLoadingState.subscribe(
      isLoading => this.isLoading = isLoading
    );

    this.user = new AuthData();
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      email: [this.user.email || '', Validators.required],
      password: [this.user.password || '', Validators.required]
    });
  }

  onSubmit(): void {
    this.trimStrings();
    this.form.markAllAsTouched();

    if (this.form.invalid)
      return;

    this.user = this.mapAuthDataFromForm();
    this.authService.login(this.user);
  }

  trimStrings(): void {
    const emailControl = this.form.get('email');
    emailControl?.setValue(emailControl?.value.toString().trim());
  }

  mapAuthDataFromForm(): AuthData {
    const authData: AuthData = {

      email: this.form.get('email').value.toString(),
      password: this.form.get('password').value.toString()

    }

    return authData;
  }

  isInvalid(controlName: string): boolean {
    return Utils.isFormControlInvalid(controlName, this.form);
  }

  isInvalidError(controlName: string, error: string): boolean {
    return Utils.isFormControlInvalidError(controlName, error, this.form);
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe;
  }

}
