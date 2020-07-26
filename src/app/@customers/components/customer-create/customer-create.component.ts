import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { NapuleValidators } from 'src/app/@core/classes/custom.validators';
import { takeUntil } from 'rxjs/operators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { ICustomer } from '../../customer.model';
import { OrdersService } from 'src/app/@orders/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'nap-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent extends BaseUnsubscriber implements OnInit {
  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();
  customerForm: FormGroup;
  hidePassword = true;
  cities: Array<{ name: string; zipCode: string }>;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private orderService: OrdersService,
    private customersService: CustomersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phone: this.fb.group(
          {
            areaCode: [null, Validators.required],
            localNumber: [null, Validators.required]
          },
          { validators: NapuleValidators.phone_ar }
        ),
        email: [null, [Validators.required, Validators.email]],
        address: this.fb.group({
          street: [null, Validators.required],
          number: [null, Validators.required],
          city: [null, Validators.required]
        }),
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

  get localNumber() {
    return this.customerForm.get('phone.localNumber');
  }

  get phone() {
    return this.customerForm.get('phone');
  }

  onPhoneInput() {
    if (this.phone.hasError('phone') && (this.phone.touched || this.phone.dirty)) {
      this.localNumber.setErrors([{ phone: true }]);
    }
  }

  onPasswordInput() {
    if (this.customerForm.hasError('passwordMissmatch')) {
      this.confirmation.setErrors([{ passwordMissmatch: true }]);
    }
  }

  onSubmit() {
    this.customersService
      .createCustomer(this.customerForm.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        (customer: ICustomer) => {
          this.snackBar.open(`${customer.firstName} gracias por registrate. Revisá el correo.`);
          this.orderService.initializeOrder();
        },
        err => {
          console.log('Le error', err);
        }
      );
  }

  goBack() {
    this.cancel.emit();
  }
}
