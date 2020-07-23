import { Injectable, Inject } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, ReplaySubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { IOrder, ORDER_STATE, IPizzaItem, IMPPreferenceItem } from '../order.model';
import { inject } from '@angular/core/testing';

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
      if (day.isoWeekday() <= deliveryDay) {
        return moment().isoWeekday(deliveryDay);
      } else {
        return moment().add(1, 'week').isoWeekday(deliveryDay);
      }
    });

    return availableDeliveryDates.sort((a, b) => a.valueOf() - b.valueOf());
  }

  payOrder(order: IOrder): Observable<any> {
    const { id, customer, items } = order;

    const origin = this.document.location.origin;
    const mpItems = this.buildItemsForPreference(items);

    const testCustomer = {
      id: 613497413,
      nickname: 'TESTRQFT8LGC',
      password: 'qatest3623',
      site_status: 'active',
      email: 'test_user_34339199@testuser.com'
    };

    const excludedPaymentTypes = [{ id: 'ticket' }, { id: 'atm' }, { id: 'credit_card' }];

    const preference = {
      items: [...mpItems],
      external_reference: `preference-order-${id}`,
      payer: {
        name: customer.firstName,
        surname: customer.lastName,
        email: customer.email,
        phone: {
          area_code: customer.phone.areaCode,
          number: customer.phone.number
        },
        address: {
          zip_code: customer.address.zipCode,
          street_name: customer.address.street,
          street_number: customer.address.number
        }
      },
      payment_methods: {
        excluded_payment_types: excludedPaymentTypes,
        installments: 1,
        default_installments: 1
      },
      back_urls: {
        success: `${origin}/payment/ok`,
        pending: `${origin}/payment/pending`,
        failure: `${origin}/payment/error`
      },
      notification_url: `${this.napuleAPIURL}/payments/webhook`,
      auto_return: 'approved'
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get(`${this.napuleAPIURL}/payments/mp-access-token`).pipe(
      switchMap((res: any) => {
        const url = `${this.mercadoPagoAPIURL}/preferences?access_token=${res.mpAccessToken}`;
        return this.httpClient.post(url, preference, { headers }).pipe(catchError(err => throwError(err)));
      })
    );
  }

  private buildItemsForPreference(items: IPizzaItem[]): IMPPreferenceItem[] {
    return items.map(item => {
      const { quantity, pizza } = item;
      return {
        id: pizza.id,
        title: pizza.name,
        description: `Pizza con ${pizza.ingredients.join(', ')}`,
        picture_url: `${origin}/assets/img/${pizza.id}.png`,
        category_id: 'pizzas',
        quantity,
        currency_id: 'ARS',
        unit_price: 1 // pizza.price
      };
    });
  }
}
