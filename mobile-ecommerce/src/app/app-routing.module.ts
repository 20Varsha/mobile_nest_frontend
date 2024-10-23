import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { OrderComponent } from './pages/order/order.component';
import { AuthGuard } from './auth/auth.guard'; 

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent ,canActivate: [AuthGuard]},
  { path: 'product-details/:id', component: ProductDetailsComponent,canActivate: [AuthGuard] },
  { path: 'order/:id', component: OrderComponent, canActivate: [AuthGuard] }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
