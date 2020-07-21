import { Component, OnInit, Input, Output } from '@angular/core';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { PizzasService } from 'src/app/@pizzas/pizzas.service';
import { takeUntil } from 'rxjs/operators';
import { IPizza } from 'src/app/@pizzas/pizza.model';
import { IPizzaItem, IOrder } from '../../order.model';
import { OrdersService } from '../../services/orders.service';
import * as moment from 'moment';

@Component({
  selector: 'nap-order-select-items',
  templateUrl: './order-select-items.component.html',
  styleUrls: ['./order-select-items.component.scss']
})
export class OrderSelectItemsComponent extends BaseUnsubscriber implements OnInit {
  order: IOrder;
  today: moment.Moment = moment();
  availableDeliveryDates: moment.Moment[];
  pizzas: IPizza[] = [];

  DATE_FORMAT = 'dddd, DD/MM/YYYY';

  constructor(private ordersService: OrdersService, private pizzasService: PizzasService) {
    super();
  }
  ngOnInit(): void {
    this.ordersService.order.pipe(takeUntil(this.onDestroy$)).subscribe(order => {
      this.order = order;
    });
    // TODO Resolve pizzas in the route resolver!!
    this.pizzasService
      .getPizzas()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((pizzas: IPizza[]) => {
        this.pizzas = pizzas;
      });

    this.availableDeliveryDates = this.ordersService.getAvailableDeliveryDates(this.today);
  }

  onPizzasQuantityChange(event: IPizzaItem) {
    const itemIndex = this.order.items.findIndex(i => i.pizza.id === event.pizza.id);

    if (event.quantity) {
      if (itemIndex >= 0) {
        this.order.items.splice(itemIndex, 1, event);
      } else {
        this.order.items.push(event);
      }
    } else {
      this.order.items.splice(itemIndex, 1);
    }
    this.order.totalItems = this.order.items.reduce((acc, item) => item.quantity + acc, 0);
    this.order.totalAmount = this.order.items.reduce((acc, item) => item.quantity * item.pizza.price + acc, 0);

    this.ordersService.order.next(this.order);
  }

  onDeliveryDateSelected(selectedDate: moment.Moment) {
    this.order.deliveryDate = selectedDate.format(this.DATE_FORMAT);
    this.ordersService.order.next(this.order);
  }
}
