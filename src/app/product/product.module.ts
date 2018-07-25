import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';
import { Ng4FilesModule } from '../../../node_modules/angular4-files-upload/src/app/ng4-files';

import { SharedModule } from '../shared/shared.module';

import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ProductShort } from '../model/productShort';

import { LoginGuard } from '../login.guard';

import { ProductComponent } from './product.component';
import { LoginComponent } from '../login/login.component';
import { EditionComponent } from './edition/edition.component';
import { HistoryComponent } from './history/history.component';
import { ModalProductBasic } from '../modal/productBasic.component';
import { ProductHeaderComponent } from './product-header/product-header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ModifiedComponent } from './modified/modified.component';
import { PrintingComponent } from './printing/printing.component';

import { PrintingModal } from '../modal/printingModal.component';
import { NewestOrderComponent } from './newest-order/newest-order.component';

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
		Ng4FilesModule,
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
		ProductHeaderComponent,
		ProductListComponent,
		ModifiedComponent,
		PrintingComponent,
		PrintingModal,
		NewestOrderComponent
	],
	providers: [
		LoginComponent,
		LoginGuard, 
		Product,
		ProductService,
		ProductShort,
	],
	bootstrap: 
	[
		ProductComponent
	],
	entryComponents: [
		ModalProductBasic,
		PrintingModal,
  	],
})
export class ProductModule { }
