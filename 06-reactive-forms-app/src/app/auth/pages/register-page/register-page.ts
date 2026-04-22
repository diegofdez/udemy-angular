import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
      [FormUtils.checkingServerResponse]
    ],
    username: [
      '',
      [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern), FormUtils.notStrider]
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [FormUtils.fieldsAreEqual('password', 'password2')]
  });

  onSubmit(): void {
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
  }
}
