import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject, ReplaySubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { IOrder, ORDER_STATE } from '../order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  order: Subject<IOrder> = new ReplaySubject(null);
  private napuleAPIURL = environment.napuleAPIURL;
  private mercadoPagoAPIURL = environment.mercadoPagoAPIURL;

  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.initializeOrder();
  }

  initializeOrder() {
    this.order.next({ state: ORDER_STATE.SELECTING_ITEMS, items: [] } as IOrder);
  }

  getAvailableDeliveryDates(day: moment.Moment): moment.Moment[] {
    const deliveryDays = [4, 5, 6];

    const availableDeliveryDates = deliveryDays.map(deliveryDay => {
      if (day.isoWeekday() < deliveryDay) {
        return moment().isoWeekday(deliveryDay);
      } else {
        return moment().add(1, 'week').isoWeekday(deliveryDay);
      }
    });

    return availableDeliveryDates.sort((a, b) => a.valueOf() - b.valueOf());
  }

  saveOrder(payload: Partial<IOrder>): Observable<IOrder> {
    return this.httpClient
      .post<IOrder>(`${this.napuleAPIURL}/orders`, payload)
      .pipe(catchError(err => throwError(err)));
  }

  payOrder(payload: IOrder): Observable<string> {
    return this.httpClient.post(`${this.napuleAPIURL}/payments`, payload).pipe(
      map((mpResponse: any) => mpResponse.init_point),
      catchError(err => throwError(err))
    );
  }
}
