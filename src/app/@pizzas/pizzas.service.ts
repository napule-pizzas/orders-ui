import { Injectable } from '@angular/core';
import { IPizza } from './pizza.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {
  constructor() {}

  // TODO this is for development purposses only, this list should come form the DB.
  private pizzas: IPizza[] = [
    {
      id: 'muzza1',
      name: 'Muzza',
      ingredients: ['salsa de tomates', 'muzza', 'aceitunas'],
      price: 280,
      slices: 8,
      freezable: true
    },
    {
      id: 'special1',
      name: 'Especial',
      ingredients: ['salsa de tomates', 'muzza', 'jamón cocido', 'morrones', 'aceitunas'],
      price: 360,
      slices: 8,
      freezable: true
    },
    {
      id: '4q1',
      name: '4 Quesos',
      ingredients: ['salsa de tomates', 'muzza, sardo, roquefort, provolone', 'aceitunas'],
      price: 380,
      slices: 8,
      freezable: true
    },
    {
      id: 'cipolla1',
      name: 'Fugazza',
      ingredients: ['muzza', 'cebolla', 'aceitunas'],
      price: 380,
      slices: 8,
      freezable: true
    }
  ];

  getPizzas(): Observable<IPizza[]> {
    // TODO this should return the collection form Database
    return of(this.pizzas);
  }
}
