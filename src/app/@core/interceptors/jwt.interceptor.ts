import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt-token');
    const napuleAPIURL = environment.napuleAPIURL;

    if (request.url.indexOf(napuleAPIURL) === 0 && token) {
      const cloned = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(cloned).pipe(catchError(this.handleError));
    } else {
      return next.handle(request).pipe(catchError(this.handleError));
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
