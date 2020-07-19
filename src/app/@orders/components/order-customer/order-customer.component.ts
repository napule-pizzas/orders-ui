import { Component, OnInit } from '@angular/core';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';

import { CustomersService } from 'src/app/@customers/services/customers.service';
import { OrdersService } from '../../services/orders.service';
import { IOrder } from '../../order.model';

@Component({
  selector: 'nap-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent extends BaseUnsubscriber implements OnInit {
  order: IOrder;
  showLogin: boolean;
  editingAddress = false;
  creatingCustomer = false;

  constructor(private ordersService: OrdersService, private customersService: CustomersService) {
    super();
  }

  ngOnInit(): void {
    combineLatest([
      this.customersService.customer.pipe(takeUntil(this.onDestroy$)),
      this.ordersService.order.pipe(takeUntil(this.onDestroy$), distinctUntilChanged())
    ])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([customer, order]) => {
        if (order && customer) {
          this.order = order;
          this.order.customer = customer;
          this.ordersService.order.next(this.order);
        }
        this.showLogin = !this.customersService.isAuthenticated;
        this.editingAddress = false;
      });
  }

  logout() {
    this.customersService.logout();
    this.ordersService.initializeOrder();
  }

  showEditCustomerAddressForm() {
    delete this.order.customer;
    this.ordersService.order.next(this.order);
    this.editingAddress = true;
  }

  register() {
    this.showLogin = false;
    this.creatingCustomer = true;
  }

  onCustomerCreateCancel() {
    this.showLogin = true;
    this.creatingCustomer = false;
  }
}
