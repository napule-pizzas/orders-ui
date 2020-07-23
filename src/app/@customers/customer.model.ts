export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: IPhone;
  address: IAddress;
  city: string;
  password: string;
}

export interface IAddress {
  zipCode: string;
  street: string;
  number: number;
}

export interface IPhone {
  areaCode: number;
  number: number;
}
