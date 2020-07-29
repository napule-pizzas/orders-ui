import { Component, AfterViewInit, Injector, OnInit } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ValidationErrors } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[matErrorMessages]',
  template: '{{ error }}'
})
// tslint:disable-next-line: component-class-suffix
export class MatErrorMessagesDirective implements AfterViewInit {
  error: string;
  inputRef: MatFormFieldControl<MatInput>;

  constructor(private injector: Injector) {}
  // Setup all initial tooling

  ngAfterViewInit() {
    const container = this.injector.get(MatFormField);
    this.inputRef = container._control;

    // sub to the control's status stream
    this.inputRef.ngControl.control.statusChanges.subscribe(state => {
      if (state === 'INVALID') {
        const controlErrors: ValidationErrors = this.inputRef.ngControl.control.errors;
        let firstValidationError: string;
        if (Array.isArray(controlErrors)) {
          firstValidationError = Object.keys(controlErrors[0])[0];
        } else {
          firstValidationError = Object.keys(controlErrors)[0];
        }

        switch (firstValidationError) {
          case 'required':
            this.error = 'Esto es necesario';
            break;
          case 'phone':
          case 'email':
          case 'pattern':
            this.error = 'Esto no está bien';
            break;
          case 'minlength':
            this.error = `Deben ser al menos ${controlErrors[firstValidationError].requiredLength} caracteres`;
            break;
          case 'maxlength':
            this.error = `Deben ser ${controlErrors[firstValidationError].requiredLength} caracteres máximo`;
            break;
          case 'notConfirmed':
            this.error = 'No es igual a la contraseña';
            break;
          case 'emailUsed':
            this.error = 'Ya está registrado';
            break;
          default:
            console.log(controlErrors);
            break;
        }
      }
    });
  }
}
