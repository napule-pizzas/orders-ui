import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { IPizza } from './pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {
  private napuleAPIURL = environment.napuleAPIURL;
  constructor(private httpClient: HttpClient) {}

  getPizzas(): Observable<IPizza[]> {
    return this.httpClient.get<IPizza[]>(`${this.napuleAPIURL}/pizzas`).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(err => throwError(err))
    );
  }
}
