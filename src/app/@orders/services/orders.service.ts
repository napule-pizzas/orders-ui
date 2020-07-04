import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
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
}
