import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICustomer } from '../customer.model';
import { CustomersService } from '../services/customers.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerTokenResolver implements Resolve<Observable<ICustomer>> {
  constructor(private customersService: CustomersService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Observable<ICustomer>> {
    const token = route.params.token;
    return of(this.customersService.getInactiveCustomerOfToken(token));
  }
}
