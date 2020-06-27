import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsFormComponent } from './order-items-form.component';

describe('OrderItemsFormComponent', () => {
  let component: OrderItemsFormComponent;
  let fixture: ComponentFixture<OrderItemsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemsFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
