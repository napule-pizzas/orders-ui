import { ValidatorFn, FormControl, ValidationErrors, FormGroup } from '@angular/forms';

const PHONE_AR_REGEXP = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g;

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

export class NapuleValidators {
  static phone_ar(control: FormControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }
    return PHONE_AR_REGEXP.test(control.value) ? null : { phone: { value: control.value } };
  }

  static passwordEquals(group: FormGroup): ValidationErrors | null {
    const password = group.get('password').value;
    const confirmation = group.get('confirmation').value;
    if (isEmptyInputValue(password) || isEmptyInputValue(confirmation)) {
      return null;
    }
    return password === confirmation ? null : { passwordMissmatch: true };
  }
}
