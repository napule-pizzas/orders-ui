import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { OrdersService } from 'src/app/@orders/services/orders.service';
import { PAYMENT_STATUS } from '../../payments.d.type';
import { IOrder, ORDER_STATE } from 'src/app/@orders/order.model';
// tslint:disable-next-line: max-line-length
// http://localhost:4200/payments?collection_id=28249066&collection_status=rejected&external_reference=pedido-5f2dec3889b44820fbbc8bd9&payment_type=credit_card&merchant_order_id=1617935829&preference_id=614352138-646f2a8e-8126-4c70-8b53-7127438a2247&site_id=MLA&processing_mode=aggregator&merchant_account_id=null

@Component({
  selector: 'nap-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent extends BaseUnsubscriber implements OnInit {
  status: string;
  order: IOrder;
  showPaymentProblem: boolean;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private ordersService: OrdersService) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params: Params) => {
          this.status = params.collection_status;
          const orderId = params.external_reference.replace('pedido-', '');
          return this.ordersService.get(orderId);
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe(order => {
        this.order = order;
        if (this.status !== PAYMENT_STATUS.APPROVED) {
          this.showPaymentProblem = true;
        }
      });
  }

  retry() {
    this.order.state = ORDER_STATE.SETTING_CUSTOMER_DATA;
    this.router.navigate(['/']);
    this.ordersService.order.next(this.order);
  }
}
