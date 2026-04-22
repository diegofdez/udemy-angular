import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500);
  });
}

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {
     for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
        case 'email':
          return 'El valor debe de ser un email válido';
        case 'emailTaken':
          return 'Correo electrónico en uso';
        case 'isStrider':
          return 'No se permite el nombre strider'
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'El valor debe de ser un email válido';
          }
          return 'Error de patrón no controlado';
        default:
          return `Error de validación no controlado: ${key}`;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors
      && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors ?? {};
    return this.getTextError(errors);
  }


  static isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors ?? {};
    return this.getTextError(errors);
  }

  static fieldsAreEqual(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;

      if (value1 === value2) {
        return null;
      } else {
        return {
          passwordsNotEqual: true
        }
      }
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log("Validando contra servidor");
    await sleep();

    const formValue = control.value;

    if (formValue == 'hola@mundo.com') {
      return {
        emailTaken: true
      }
    }

    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors {
    const formValue: string = control.value;

    if (formValue.toLowerCase().includes('strider')) {
      return {
        isStrider: true
      }
    }

    return {};
  }
}


