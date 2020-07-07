import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ordersRoutes } from './orders.routes';
import { CustomersModule } from '../@customers/customers.module';
import { CoreModule } from '../@core/core.module';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderItemsFormComponent } from './components/order-items-form/order-items-form.component';
import { OrderSelectItemsComponent } from './components/order-select-items/order-select-items.component';
import { OrderCustomerComponent } from './components/order-customer/order-customer.component';

const AngularaterialModules = [
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
];

@NgModule({
  declarations: [OrderCreateComponent, OrderItemsFormComponent, OrderSelectItemsComponent, OrderCustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ordersRoutes),
    ReactiveFormsModule,
    FlexLayoutModule,
    ...AngularaterialModules,
    CoreModule,
    CustomersModule
  ]
})
export class OrdersModule {}
