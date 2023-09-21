import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisComponent } from './components/regis/regis.component';
import { ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { AuthGuard } from './gurds/auth.guard';
import { AdminauthGuard } from './gurds/adminauth.guard';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CartComponent } from './components/cart/cart.component';
import { SearchPipe } from './pipe/search.pipe';
import { CartsComponent } from './components/carts/carts.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { TestComponent } from './components/test/test.component'; // <-- import the module

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    RegisComponent,
    ProductComponent,
    AddproductComponent,
    ViewproductComponent,
    EditproductComponent,
    CartComponent,
    SearchPipe,
    CartsComponent,
    RefreshComponent,
    CheckoutComponent,
    TestComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule    
  ],
  providers: [AuthGuard,AdminauthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
