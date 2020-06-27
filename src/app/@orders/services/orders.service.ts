import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { IOrder } from '../order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  order: Subject<IOrder> = new ReplaySubject(null);
  constructor() {}
}
