import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConfirmationComponent } from './customer-confirmation.component';

describe('CustomerConfirmationComponent', () => {
  let component: CustomerConfirmationComponent;
  let fixture: ComponentFixture<CustomerConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
