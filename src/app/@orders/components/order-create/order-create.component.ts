import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { IOrder, ORDER_STATE } from '../../order.model';
import { OrdersService } from '../../services/orders.service';
import { takeUntil } from 'rxjs/operators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { DOCUMENT } from '@angular/common';

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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef,
    private ordersService: OrdersService
  ) {
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
        this.displayActionButton = this.order.totalItems >= 2 && !!this.order.deliveryDate;
        break;
      case ORDER_STATE.SETTING_CUSTOMER_DATA:
        this.actionButtonText = 'PAGAR';
        this.displayActionButton = !!this.order.customer;
        break;
      case ORDER_STATE.PAYMENT_PENDING:
        this.actionButtonText = '';
        this.displayActionButton = false;
        this.payOrder(this.order);
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

  private payOrder(order: IOrder) {
    this.ordersService
      .payOrder(order)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(mpRes => {
        console.log(mpRes);
        // this.document.location.href = mpRes.init_point;
      });
  }
}
