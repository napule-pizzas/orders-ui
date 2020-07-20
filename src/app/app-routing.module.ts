import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCreateComponent } from './@orders/components/order-create/order-create.component';
import { CustomerConfirmationComponent } from './@customers/components/customer-confirmation/customer-confirmation.component';
import { CustomerTokenResolver } from './@customers/resolvers/customer-token.resolver';
import { PageNotFoundComponent } from './@core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: OrderCreateComponent
  },
  {
    path: 'confirmation/:token',
    component: CustomerConfirmationComponent,
    resolve: {
      customerToken: CustomerTokenResolver
    }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
