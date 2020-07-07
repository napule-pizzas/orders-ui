import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuantitySelectorComponent } from './components/quantity-selector/quantity-selector.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatErrorMessagesDirective } from './directives/mat-error-messages.directive';

const AngularMaterialModules = [MatButtonModule, MatIconModule];

@NgModule({
  imports: [CommonModule, FlexLayoutModule, ...AngularMaterialModules],
  declarations: [QuantitySelectorComponent, MatErrorMessagesDirective],
  exports: [QuantitySelectorComponent, MatErrorMessagesDirective]
})
export class CoreModule {}
