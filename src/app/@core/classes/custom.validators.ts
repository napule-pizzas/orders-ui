import { ValidatorFn, FormControl, ValidationErrors, FormGroup } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const PHONE_AR_REGEXP = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g;

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

export class NapuleValidators {
  static phone_ar(group: FormGroup): ValidationErrors | null {
    const areaCode = group.get('areaCode').value;
    const localNumber = group.get('localNumber').value;
    if (isEmptyInputValue(areaCode) || isEmptyInputValue(localNumber)) {
      return null; // don't validate empty values to allow optional controls
    }
    const phoneNumber = parsePhoneNumberFromString(areaCode + localNumber, 'AR');
    if (!phoneNumber || !phoneNumber.isValid()) {
      return { phone: { value: areaCode + localNumber } };
    }
    return null;
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
