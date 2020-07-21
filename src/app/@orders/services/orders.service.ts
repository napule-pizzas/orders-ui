import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { IOrder, ORDER_STATE } from '../order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  order: Subject<IOrder> = new ReplaySubject(null);
  constructor() {
    this.initializeOrder();
  }

  initializeOrder() {
    this.order.next({ state: ORDER_STATE.SELECTING_ITEMS, items: [] } as IOrder);
  }

  getAvailableDeliveryDates(day: moment.Moment): moment.Moment[] {
    const deliveryDays = [4, 5, 6];

    const availableDeliveryDates = deliveryDays.map(deliveryDay => {
      if (day.isoWeekday() <= deliveryDay) {
        return moment().isoWeekday(deliveryDay);
      } else {
        return moment().add(1, 'week').isoWeekday(deliveryDay);
      }
    });

    return availableDeliveryDates.sort((a, b) => a.valueOf() - b.valueOf());
  }
}
