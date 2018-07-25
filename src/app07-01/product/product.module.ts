import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';

import { SharedModule } from '../shared/shared.module';

import { MainData } from '../mainData';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ProductShort } from '../model/productShort';

import { LoginGuard } from '../login.guard';

import { ProductComponent } from './product.component';
import { LoginComponent } from '../login/login.component';
import { EditionComponent } from './edition/edition.component';
import { HistoryComponent } from './history/history.component';
import { ModalProductBasic } from '../modal/productBasic.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ModifiedComponent } from './modified/modified.component';

export const routes: Routes = [
	{
	    path: 'products',
	    canActivate: [ LoginGuard ],
	    component: ProductComponent,
	    children: 
	    [
	      {
	        path: 'edition/:id',
	        canActivate: [ LoginGuard ],
	        component: EditionComponent
	      },
	      {
	        path: 'history/:id',
	        canActivate: [ LoginGuard ],
	        component: HistoryComponent
	      }
	    ]
  	}
];

@NgModule({
	imports: 
	[
		BrowserModule,
		CommonModule,
		CookieModule.forRoot(),
		FormsModule,
		NgbModule.forRoot(),
		RouterModule.forChild(routes),
		SharedModule
	],
	exports: 
	[
		ProductComponent
	],
	declarations: 
	[
		ProductComponent,
		HistoryComponent,
		EditionComponent,
		ModalProductBasic,
		ProductListComponent,
		ModifiedComponent,
	],
	providers: [
		MainData,
		LoginComponent,
		LoginGuard, 
		Product,
		ProductService,
		ProductShort
	],
	bootstrap: 
	[
		ProductComponent
	],
	entryComponents: [
    	ModalProductBasic
  	],
})
export class ProductModule { }
