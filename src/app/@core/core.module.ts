import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuantitySelectorComponent } from './components/quantity-selector/quantity-selector.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const AngularMaterialModules = [MatButtonModule, MatIconModule];

@NgModule({
  imports: [CommonModule, FlexLayoutModule, ...AngularMaterialModules],
  declarations: [QuantitySelectorComponent],
  exports: [QuantitySelectorComponent]
})
export class CoreModule {}
