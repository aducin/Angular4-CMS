import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../login.guard';

import { LoadingModule } from 'ngx-loading';

import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderListComponent } from './order-list/order-list.component';

import { OrderService } from '../service/order.service';

export const routes: Routes = [
    {
        path: 'orders',
        component: OrderComponent,
        children:
            [
                {
                    path: ':db/:id',
                    component: OrderListComponent
                },
                {
                    path: ':db/:id/discount',
                    component: OrderListComponent
                },
                {
                    path: ':db/:id/even',
                    component: OrderListComponent
                },
                {
                    path: ':db/:id/mail',
                    component: OrderListComponent
                },
                {
                    path: ':db/:id/voucher',
                    component: OrderListComponent
                }
            ]
    }
];

@NgModule({
	declarations: [
	    OrderComponent,
	    OrderListComponent
	],
  	imports: [
    	CommonModule,
      FormsModule,
      LoadingModule,
    	SharedModule,
      RouterModule.forChild(routes),
  	],
 	providers: 
  [
    LoginGuard,
    OrderService
  ],
  bootstrap: [ 
    OrderComponent
  ]
})
export class OrderModule { }
