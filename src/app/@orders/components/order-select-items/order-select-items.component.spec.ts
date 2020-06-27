import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSelectItemsComponent } from './order-select-items.component';

describe('OrderSelectItemsComponent', () => {
  let component: OrderSelectItemsComponent;
  let fixture: ComponentFixture<OrderSelectItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSelectItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSelectItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
