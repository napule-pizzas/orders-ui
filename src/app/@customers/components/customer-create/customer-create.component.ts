import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { NapuleValidators } from 'src/app/@core/classes/custom.validators';

@Component({
  selector: 'nap-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  hidePassword = true;
  cities: string[];
  constructor(private fb: FormBuilder, private customersService: CustomersService) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phone: [null, [Validators.required, NapuleValidators.phone_ar]],
        mobile: null,
        email: [null, [Validators.required, Validators.email]],
        address: [null, Validators.required],
        city: [null, Validators.required],
        password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        confirmation: [null, Validators.required]
      },
      { validators: NapuleValidators.passwordEquals }
    );

    this.cities = this.customersService.cities;
  }

  get confirmation() {
    return this.customerForm.get('confirmation');
  }

  onPasswordInput() {
    if (this.customerForm.hasError('passwordMissmatch')) {
      this.confirmation.setErrors([{ passwordMissmatch: true }]);
    }
  }

  onSubmit() {
    console.log('le form', this.customerForm.value);
  }

  cancel() {}
}
