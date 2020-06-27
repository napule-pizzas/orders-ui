import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nap-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuantitySelectorComponent implements OnInit {
  @Output()
  quantityChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  quantity = 0;

  ngOnInit(): void {}

  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}
