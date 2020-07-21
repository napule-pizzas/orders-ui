import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { LoadingIndicatorService } from '../services/loading-indicator.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingIndicatorService: LoadingIndicatorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingIndicatorService.show();
    return next.handle(req).pipe(finalize(() => this.loadingIndicatorService.hide()));
  }
}
