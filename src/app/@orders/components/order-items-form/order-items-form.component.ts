import { Component, Input, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { IPizza } from 'src/app/@pizzas/pizza.model';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders.service';
import { IPizzaItem } from '../../order.model';

@Component({
  selector: 'nap-order-items-form',
  templateUrl: './order-items-form.component.html',
  styleUrls: ['./order-items-form.component.scss']
})
export class OrderItemsFormComponent {
  @Input()
  pizzas: IPizza[];

  @Output()
  pizzasQuantityChange: EventEmitter<IPizzaItem> = new EventEmitter();

  @ViewChild('pizzaDetailsDialog') pizzaDetailsDialog: TemplateRef<any>;

  constructor(private matDialog: MatDialog, private orderService: OrdersService) {}

  showDetails(pizza: IPizza) {
    this.matDialog.open(this.pizzaDetailsDialog, { data: { pizza } });
  }

  onPizzaQuantityChanged(quantity: number, pizza: IPizza) {
    this.pizzasQuantityChange.emit({ quantity, pizza });
  }
}
