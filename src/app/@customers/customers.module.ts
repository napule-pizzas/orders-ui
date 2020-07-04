import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerEditAddressComponent } from './components/customer-edit-address/customer-edit-address.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';

const AngularaterialModules = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule
];

@NgModule({
  declarations: [CustomerLoginComponent, CustomerEditAddressComponent, CustomerCreateComponent],
  imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, ...AngularaterialModules],
  exports: [CustomerLoginComponent, CustomerEditAddressComponent, CustomerCreateComponent]
})
export class CustomersModule {}
