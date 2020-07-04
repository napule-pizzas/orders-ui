import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditAddressComponent } from './customer-edit-address.component';

describe('CustomerEditAddressComponent', () => {
  let component: CustomerEditAddressComponent;
  let fixture: ComponentFixture<CustomerEditAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEditAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
