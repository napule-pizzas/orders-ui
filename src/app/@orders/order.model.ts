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

export interface IMPPreferenceItem {
  id: string;
  title: string;
  description: string;
  picture_url: string;
  category_id: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
}
export enum ORDER_STATE {
  SELECTING_ITEMS = 'SELECTING_ITEMS',
  SETTING_CUSTOMER_DATA = 'SETTING_CUSTOMER_DATA',
  PREPARING = 'PREPARING',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAYD = 'PAYD',
  DELIVERED = 'DELIVERED'
}
