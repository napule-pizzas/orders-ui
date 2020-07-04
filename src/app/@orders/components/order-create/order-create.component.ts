import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IOrder, ORDER_STATE } from '../../order.model';
import { OrdersService } from '../../services/orders.service';
import { takeUntil } from 'rxjs/operators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';

@Component({
  selector: 'nap-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent extends BaseUnsubscriber implements OnInit {
  order: IOrder;

  displayActionButton: boolean;
  actionButtonText: string;

  ORDER_STATE = ORDER_STATE;

  constructor(private cd: ChangeDetectorRef, private ordersService: OrdersService) {
    super();
  }

  ngOnInit(): void {
    this.ordersService.order.pipe(takeUntil(this.onDestroy$)).subscribe((order: IOrder) => {
      this.manageOrderState(order);
    });
  }

  nextState() {
    switch (this.order.state) {
      case ORDER_STATE.SELECTING_ITEMS:
        this.order = { ...this.order, state: ORDER_STATE.SETTING_CUSTOMER_DATA };
        break;
      case ORDER_STATE.SETTING_CUSTOMER_DATA:
        this.order = { ...this.order, state: ORDER_STATE.PAYMENT_PENDING };
        break;
      default:
        break;
    }

    this.ordersService.order.next(this.order);
  }

  private manageOrderState(order: IOrder) {
    this.order = order;
    switch (this.order.state) {
      case ORDER_STATE.SELECTING_ITEMS:
        this.actionButtonText = 'PEDIR';
        this.displayActionButton = this.order.totalItems >= 2;
        break;
      case ORDER_STATE.SETTING_CUSTOMER_DATA:
        this.actionButtonText = 'PAGAR';
        this.displayActionButton = !!this.order.customer;
        break;
      default:
        break;
    }

    console.log(
      '#manageOrderState',
      'Order',
      this.order,
      'Display AB',
      this.displayActionButton,
      this.actionButtonText
    );

    this.cd.detectChanges();
  }
}
