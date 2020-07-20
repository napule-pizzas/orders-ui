import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICustomer } from '../customer.model';
import { CustomersService } from '../services/customers.service';

interface CustomerToken {
  token: string;
  customer: ICustomer;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerTokenResolver implements Resolve<Observable<CustomerToken>> {
  constructor(private customersService: CustomersService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<CustomerToken> {
    const token: string = route.params.token;
    return this.customersService
      .getInactiveCustomerOfToken(token)
      .pipe(map((customer: ICustomer) => ({ token, customer })));
  }
}
