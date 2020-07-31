import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { IOrder, ORDER_STATE } from '../../order.model';
import { OrdersService } from '../../services/orders.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { LoadingIndicatorService } from 'src/app/@core/services/loading-indicator.service';

@Component({
  selector: 'nap-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent extends BaseUnsubscriber implements OnInit {
  order: IOrder;

  disableActionButton: boolean;
  displayActionButton: boolean;
  actionButtonText: string;
  isLoading: Subject<boolean> = this.loadingIndicatorService.isLoading;

  ORDER_STATE = ORDER_STATE;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef,
    private loadingIndicatorService: LoadingIndicatorService,
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
        this.disableActionButton = this.order.totalItems < 2 || !this.order.deliveryDate;
        this.displayActionButton = true;
        break;
      case ORDER_STATE.SETTING_CUSTOMER_DATA:
        this.actionButtonText = 'PAGAR';
        this.disableActionButton = !this.order.customer;
        this.displayActionButton = !!this.order.customer;
        break;
      case ORDER_STATE.PAYMENT_PENDING:
        this.actionButtonText = '';
        this.disableActionButton = true;
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
      'Disabled AB',
      this.disableActionButton,
      this.actionButtonText
    );

    this.cd.detectChanges();
  }

  private payOrder(order: IOrder) {
    this.ordersService
      .saveOrder(order)
      .pipe(
        switchMap((savedOrder: IOrder) => {
          return this.ordersService.payOrder(savedOrder);
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe((mpURL: string) => {
        console.log(mpURL);
        this.document.location.href = mpURL;
      });
  }
}
