import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);

      setTimeout(
        () => this.hasError.set(false),
        3000
      );

      return;
    }

    const { email, password } = this.loginForm.value;

    console.log({ email, password });

    this.authService.login(email!, password!)
      .subscribe(isAuthenticated => {
        console.log(isAuthenticated)

        if (isAuthenticated) {
          this.router.navigateByUrl('/');
        } else {
          this.hasError.set(true);
          setTimeout(() => this.hasError.set(false), 3000);
        }
      });
  }

  // check auth

}
