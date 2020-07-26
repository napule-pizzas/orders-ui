import { IPizza } from '../@pizzas/pizza.model';
import { ICustomer } from '../@customers/customer.model';

export interface IOrder {
  id: string;
  state: ORDER_STATE;
  items: IPizzaItem[];
  customer: ICustomer;
  totalItems: number;
  totalAmount: number;
  deliveryDate: Date;
}

export interface IPizzaItem {
  quantity: number;
  pizza: IPizza;
}
export enum ORDER_STATE {
  SELECTING_ITEMS = 'SELECTING_ITEMS',
  SETTING_CUSTOMER_DATA = 'SETTING_CUSTOMER_DATA',
  PREPARING = 'PREPARING',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAYMENT_FAILURE = 'PAYMENT_FAILURE',
  PAYD = 'PAYD',
  DELIVERED = 'DELIVERED'
}
