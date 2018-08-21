import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { CookieService } from 'ngx-cookie-service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PostalModule } from './postal/postal.module';
import { AccountsModule } from './accounts/accounts.module';
import { DeliveryModule } from './delivery/delivery.module';

import { Labels } from './labels';
import { LoginGuard } from './login.guard';

import { LoginService } from './service/login.service';
import { TokenService } from './service/token.service';

@NgModule({
  declarations: 
  [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ProductModule,
    OrderModule,
    PostalModule,
    AccountsModule,
    DeliveryModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'products',
        loadChildren: './product/product.module#ProductModule'
      },
      {
        path: 'products/edition/:id',
        loadChildren: './product/product.module#ProductModule'
      },
      {
        path: 'products/history/:id',
        loadChildren: './product/product.module#ProductModule'
      },
      {
        path: 'orders',
        loadChildren: './order/order.module#OrderModule'
      },
      {
        path: 'orders/:db/:id',
        loadChildren: './order/order.module#OrderModule'
      },
      {
        path: 'postal',
        loadChildren: './postal/postal.module#PostalModule'
      },
      {
        path: 'accounts',
        loadChildren: './accounts/accounts.module#AccountsModule#AccountsModule'
      },
      {
        path: 'delivery',
        loadChildren: './delivery/delivery.module#DeliveryModule'
      }
    ], 
    {useHash: true})
  ],
  providers: 
  [
    CookieService,
    Labels,
    LoginGuard, 
    LoginService,
    TokenService
  ],
  bootstrap: 
  [
    AppComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
