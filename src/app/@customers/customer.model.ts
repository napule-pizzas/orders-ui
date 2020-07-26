export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: IPhone;
  address: IAddress;
  password: string;
}

export interface IAddress {
  street: string;
  number: string;
  city: ICity;
}

export interface ICity {
  name: string;
  zipCode: string;
}

export interface IPhone {
  areaCode: string;
  number: string;
}
