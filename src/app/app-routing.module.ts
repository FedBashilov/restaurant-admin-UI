import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'products',
    children: [
      {path: '', component: ProductsPageComponent},
      {path: 'new', component: ProductPageComponent},
      {path: ':id', component: ProductPageComponent},

    ]
  },
  {path: 'orders',
    children: [
      {path: '', component: OrdersPageComponent},
      {path: ':id', component: OrderPageComponent},
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginPageComponent, OrdersPageComponent, ProductsPageComponent, ProductPageComponent, OrderPageComponent]
