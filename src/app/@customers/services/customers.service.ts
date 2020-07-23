import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ICustomer } from '../customer.model';

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

  private napuleAPIURL = environment.napuleAPIURL;
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
      .post<AuthResponse>(`${this.napuleAPIURL}/auth`, { username, password })
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
    return this.httpClient
      .get<ICustomer>(`${this.napuleAPIURL}/users/${customerId}`)
      .pipe(catchError(err => throwError(err)));
  }

  editCustomerAddress(payload: Partial<ICustomer>) {
    return this.httpClient
      .patch<ICustomer>(`${this.napuleAPIURL}/users/${payload.id}`, payload)
      .pipe(catchError(err => throwError(err)));
  }

  createCustomer(payload: Partial<ICustomer>) {
    return this.httpClient
      .post<ICustomer>(`${this.napuleAPIURL}/users`, payload)
      .pipe(catchError(err => throwError(err)));
  }

  getInactiveCustomerOfToken(token: string): Observable<ICustomer> {
    return this.httpClient
      .get<ICustomer>(`${this.napuleAPIURL}/users/inactive/${token}`)
      .pipe(catchError(err => throwError(err)));
  }

  confirmCustomer(payload: { token: string; username: string }): Observable<ICustomer> {
    return this.httpClient
      .post<ICustomer>(`${this.napuleAPIURL}/users/confirm`, payload)
      .pipe(catchError(err => throwError(err)));
  }

  resendConfirmationEmail(userId: string) {
    return this.httpClient.get(`${this.napuleAPIURL}/users/resend/${userId}`).pipe(catchError(err => throwError(err)));
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
