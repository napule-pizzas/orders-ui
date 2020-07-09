import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, Subject, BehaviorSubject, throwError } from 'rxjs';
import { ICustomer } from '../customer.model';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface AuthResponse {
  token: string;
  user: ICustomer;
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  token: string;
  customer: Subject<ICustomer> = new BehaviorSubject(null);

  // TODO get api url from ENV or config
  private apiUrl = 'http://localhost:8182/v1/';

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      this.token = token;
      if (this.isAuthenticated) {
        const { userId } = this.jwtHelper.decodeToken(this.token);
        this.getCustomer(userId).subscribe(customer => {
          this.customer.next(customer);
        });
      }
    } else {
      this.token = '';
    }
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.apiUrl}auth`, { username, password })
      .pipe(catchError(err => throwError(err)));
  }

  logout() {
    this.token = null;
    localStorage.removeItem('jwt-token');
    this.customer.next(null);
  }

  get isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt-token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCustomer(customerId: string) {
    return this.httpClient.get<ICustomer>(`${this.apiUrl}users/${customerId}`).pipe(catchError(err => throwError(err)));
  }

  editCustomerAddress(payload: Partial<ICustomer>) {
    return this.httpClient
      .patch<ICustomer>(`${this.apiUrl}users/${payload.id}`, payload)
      .pipe(catchError(err => throwError(err)));
  }

  createCustomer(payload: Partial<ICustomer>) {
    return this.httpClient.post<ICustomer>(`${this.apiUrl}users`, payload).pipe(catchError(err => throwError(err)));
  }

  get cities() {
    return [
      'Capital',
      'Carrodilla',
      'Chacras de Coria',
      'Dorrego',
      'Godoy Cruz',
      'Las Heras',
      'Luzuriaga',
      'Villa Nueva'
      // 'Capital',
      // 'General Alvear',
      // 'Godoy Cruz',
      // 'Guaymallén',
      // 'Junín',
      // 'La Paz',
      // 'Las Heras',
      // 'Lavalle',
      // 'Luján de Cuyo',
      // 'Maipú'
      // 'Malargüe',
      // 'Rivadavia',
      // 'San Carlos',
      // 'San Martín',
      // 'San Rafael',
      // 'Santa Rosa',
      // 'Tunuyán',
      // 'Tupungato'
    ];
  }
}
