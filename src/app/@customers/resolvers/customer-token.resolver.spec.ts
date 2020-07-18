import { TestBed } from '@angular/core/testing';

import { CustomerTokenResolver } from './customer-token.resolver';

describe('CustomerTokenService', () => {
  let service: CustomerTokenResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerTokenResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
