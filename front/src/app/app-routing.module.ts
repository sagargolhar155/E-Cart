import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { CartComponent } from './components/cart/cart.component';
import { CartsComponent } from './components/carts/carts.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { RegisComponent } from './components/regis/regis.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';
import { AdminauthGuard } from './gurds/adminauth.guard';
import { AuthGuard } from './gurds/auth.guard';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'regis',component:RegisComponent},
  {path:'',component:ProductComponent,canActivate:[AuthGuard]},
  {path:'addproduct',component:AddproductComponent,canActivate:[AdminauthGuard]},
  {path:'viewproduct/:id',component:ViewproductComponent,canActivate:[AuthGuard]},
  {path:'edit/:id',component:EditproductComponent,canActivate:[AdminauthGuard]},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'refresh',component:RefreshComponent},
  {path:'test',component:TestComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
