import { IPizza } from '../@pizzas/pizza.model';
import { ICustomer } from '../@customers/customer.model';

export interface IOrder {
  id: string;
  state: ORDER_STATE;
  items: IPizzaItem[];
  customer: ICustomer;
  totalItems: number;
  totalAmount: number;
  deliveryDate: string; // Miércoles 24 de junio de 2020
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
  PAYD = 'PAYD',
  DELIVERED = 'DELIVERED'
}
