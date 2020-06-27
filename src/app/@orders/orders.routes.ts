import { Routes } from '@angular/router';
import { OrderCreateComponent } from './components/order-create/order-create.component';

export const ordersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OrderCreateComponent
      }
      // {
      //   path: ':id',
      //   resolve: {
      //     recipe: RecipeResolver
      //   },
      //   children: [
      //     {
      //       path: '',
      //       pathMatch: 'full',
      //       component: RecipeDetailsComponent
      //     },
      //     {
      //       path: 'edit',
      //       component: RecipeEditComponent
      //       // canDeactivate: [PendingChangesGuard]
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/404'
  }
];
