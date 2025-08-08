import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { DialogService, RouterService } from '../../services';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: RouterService,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService
  ) {
    // Redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.goToVacancy(0);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.router.goToVacancy(0);
        },
        error: error => {
          this.dialogService.error(error);
          this.error = error;
          this.loading = false;
        }
      });
  }
}
