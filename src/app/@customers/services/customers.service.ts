import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICustomer } from '../customer.model';

const mockedCustomer = {
  id: 'algoId',
  firstName: 'Miguel',
  lastName: 'Senosiain',
  phone: '2616631796',
  address: 'Verdaguer 436',
  city: 'Godoy Cruz'
};

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor() {}

  findCustomerByPhone(phone: string): Observable<ICustomer> {
    // TODO get customer from API / Firebase
    // return this.http.get<BlogPost[]>(`${this.apiUrl}/posts?userId=${id}`).pipe(catchError(err => of([])));

    return of(mockedCustomer);
  }
}
