import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { IOrder } from '../../order.model';
import { ICustomer } from 'src/app/@customers/customer.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CustomersService } from 'src/app/@customers/services/customers.service';
import { liveSearch } from 'src/app/@core/classes/live-search.operator';

@Component({
  selector: 'nap-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent extends BaseUnsubscriber implements OnInit {
  order: IOrder;
  customerForm: FormGroup;
  private customerPhoneSubject = new Subject<string>();

  readonly customer$ = this.customerPhoneSubject.pipe(
    liveSearch(phone => this.customersService.findCustomerByPhone(phone))
  );

  constructor(private ordersService: OrdersService, private customersService: CustomersService) {
    super();
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      phone: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null)
    });
    this.ordersService.order.pipe().subscribe(order => {
      this.order = order;
    });
  }

  findCustomerByPhone(phone: string) {
    this.customerPhoneSubject.next(phone);
  }
}
