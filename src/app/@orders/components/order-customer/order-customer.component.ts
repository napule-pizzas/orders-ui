import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { liveSearch } from 'src/app/@core/classes/live-search.operator';
import { OrdersService } from '../../services/orders.service';
import { IOrder } from '../../order.model';
import { ICustomer } from 'src/app/@customers/customer.model';
import { CustomersService } from 'src/app/@customers/services/customers.service';

@Component({
  selector: 'nap-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent extends BaseUnsubscriber implements OnInit {
  order: IOrder;
  editingCustomer = false;
  editingAddress = false;
  customerForm: FormGroup;

  departments = [
    'Capital',
    'General Alvear',
    'Godoy Cruz',
    'Guaymallén',
    'Junín',
    'La Paz',
    'Las Heras',
    'Lavalle',
    'Luján de Cuyo',
    'Maipú',
    'Malargüe',
    'Rivadavia',
    'San Carlos',
    'San Martín',
    'San Rafael',
    'Santa Rosa',
    'Tunuyán',
    'Tupungato'
  ];
  private customerPhoneSubject = new Subject<string>();
  private originalCustomer: ICustomer;

  constructor(private ordersService: OrdersService, private customersService: CustomersService) {
    super();
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required)
    });
    this.ordersService.order.pipe(takeUntil(this.onDestroy$)).subscribe(order => {
      this.order = order;
    });

    this.customerPhoneSubject
      .pipe(
        takeUntil(this.onDestroy$),
        filter(phone => phone.length === 10),
        liveSearch(phone => this.customersService.findCustomerByPhone(phone))
      )
      .subscribe((customer: ICustomer) => {
        this.order.customer = customer;
        this.ordersService.order.next(this.order);
      });
  }

  findCustomerByPhone(phone: string) {
    this.customerPhoneSubject.next(phone);
  }

  showEditCustomerAddressForm() {
    this.originalCustomer = this.order.customer;
    this.editingAddress = true;
    this.customerForm.setValue({
      firstName: this.originalCustomer.firstName,
      lastName: this.originalCustomer.lastName,
      phone: this.originalCustomer.phone,
      address: this.originalCustomer.address,
      city: this.originalCustomer.city
    });
    this.order.customer.address = '';
    this.order.customer.city = '';
    this.ordersService.order.next(this.order);
  }

  editCustomerAddress() {
    this.order.customer = this.customerForm.value;
    this.ordersService.order.next(this.order);
    this.editingAddress = false;
  }

  cancelEditCustomerAddress() {
    this.order.customer = this.originalCustomer;
    this.editingAddress = false;
  }
}
