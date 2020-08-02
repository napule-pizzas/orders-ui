import { Component, OnInit } from '@angular/core';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, filter } from 'rxjs/operators';
import { OrdersService } from 'src/app/@orders/services/orders.service';
// tslint:disable-next-line: max-line-length
// http://localhost:4200/payments?collection_id=28249066&collection_status=rejected&external_reference=preference-order-undefined&payment_type=credit_card&merchant_order_id=1617935829&preference_id=614352138-646f2a8e-8126-4c70-8b53-7127438a2247&site_id=MLA&processing_mode=aggregator&merchant_account_id=null

@Component({
  selector: 'nap-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent extends BaseUnsubscriber implements OnInit {
  status: string;
  constructor(private activatedRoute: ActivatedRoute, private ordersService: OrdersService) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(
        filter(params => params.collection_status),
        takeUntil(this.onDestroy$)
      )
      .subscribe(params => {
        this.status = params.collection_status;
        console.log();
      });
  }
}
