import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreModule } from '../@core/core.module';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerEditAddressComponent } from './components/customer-edit-address/customer-edit-address.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerConfirmationComponent } from './components/customer-confirmation/customer-confirmation.component';

const AngularMaterialModules = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatSnackBarModule
];

const Components = [
  CustomerLoginComponent,
  CustomerEditAddressComponent,
  CustomerCreateComponent,
  CustomerConfirmationComponent
];

@NgModule({
  declarations: [...Components],
  imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, ...AngularMaterialModules, CoreModule],
  exports: [...Components]
})
export class CustomersModule {}
