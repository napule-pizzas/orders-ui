import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICustomer, ICity } from '../../customer.model';
import { CustomersService } from '../../services/customers.service';
import { takeUntil } from 'rxjs/operators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { SSL_OP_NO_TLSv1_1 } from 'constants';

@Component({
  selector: 'nap-customer-edit-address',
  templateUrl: './customer-edit-address.component.html',
  styleUrls: ['./customer-edit-address.component.scss']
})
export class CustomerEditAddressComponent extends BaseUnsubscriber implements OnInit {
  customer: ICustomer;
  addressForm: FormGroup;
  cities: ICity[];

  constructor(private fb: FormBuilder, private customersService: CustomersService) {
    super();
  }

  ngOnInit(): void {
    this.customersService.customer.subscribe(customer => {
      this.customer = customer;
      this.addressForm = this.fb.group({
        street: [customer.address.street, Validators.required],
        number: [customer.address.number, Validators.required],
        city: [customer.address.city, Validators.required]
      });
    });

    this.cities = this.customersService.cities;
  }

  compareCities(o1: ICity, o2: ICity): boolean {
    return o1.zipCode === o2.zipCode;
  }

  onSubmit() {
    const payload = this.addressForm.value;
    this.customersService
      .editCustomerAddress(this.customer.id, payload)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        customer => {
          console.log(customer);
          this.customersService.customer.next({ ...this.customer, ...customer });
        },
        err => console.log(err) // TODO display error message to the user
      );
  }

  cancel() {
    this.customersService.customer.next(this.customer);
  }
}
