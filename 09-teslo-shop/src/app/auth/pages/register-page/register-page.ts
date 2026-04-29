import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);

      setTimeout(
        () => this.hasError.set(false),
        3000
      );

      return;
    }

    const { email, fullName, password } = this.registerForm.value;

    console.log({ email, fullName, password });

    this.authService.register(email!, fullName!, password!)
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
}
