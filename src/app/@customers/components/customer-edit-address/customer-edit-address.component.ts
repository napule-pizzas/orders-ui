import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICustomer } from '../../customer.model';
import { CustomersService } from '../../services/customers.service';
import { takeUntil } from 'rxjs/operators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';

@Component({
  selector: 'nap-customer-edit-address',
  templateUrl: './customer-edit-address.component.html',
  styleUrls: ['./customer-edit-address.component.scss']
})
export class CustomerEditAddressComponent extends BaseUnsubscriber implements OnInit {
  customer: ICustomer;
  addressForm: FormGroup;
  cities: string[];

  constructor(private fb: FormBuilder, private customersService: CustomersService) {
    super();
  }

  ngOnInit(): void {
    this.customersService.customer.subscribe(customer => {
      this.customer = customer;
      this.addressForm = this.fb.group({
        address: [customer.address, Validators.required],
        city: [customer.city, Validators.required]
      });
    });

    this.cities = this.customersService.cities;
  }

  onSubmit() {
    const payload = this.addressForm.value;
    payload.id = this.customer.id;
    this.customersService
      .editCustomerAddress(payload)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        customer => {
          console.log(customer);
          this.customersService.customer.next(customer);
        },
        err => console.log(err) // TODO display error message to the user
      );
  }

  cancel() {
    this.customersService.customer.next(this.customer);
  }
}
