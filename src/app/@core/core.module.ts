import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatErrorMessagesDirective } from './directives/mat-error-messages.directive';
import { QuantitySelectorComponent } from './components/quantity-selector/quantity-selector.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

const AngularMaterialModules = [MatButtonModule, MatIconModule, MatProgressBarModule];

const Components = [
  QuantitySelectorComponent,
  MatErrorMessagesDirective,
  PageNotFoundComponent,
  LoadingIndicatorComponent
];

@NgModule({
  imports: [CommonModule, FlexLayoutModule, ...AngularMaterialModules],
  declarations: [...Components],
  exports: [...Components]
})
export class CoreModule {}
