import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { LoginGuard } from '../login.guard';

import { SharedModule } from '../shared/shared.module';
import { DeliveryService } from '../service/delivery.service';
import { Config } from '../config';

import { DeliveryComponent } from './delivery.component';
import { DeliveryHeaderComponent } from './delivery-header/delivery-header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';
import { OrderModule } from 'ngx-order-pipe';

import { DeliveryListComponent } from './delivery-list/delivery-list.component';

import { DeliveryModal } from '../modal/deliveryModal.component';

import { Ng4FilesModule } from '../../../node_modules/angular4-files-upload/src/app/ng4-files';

const deliveryRoutes: Routes = [
  { 
    path: 'delivery', 
    canActivate: [ LoginGuard ],  
    component: DeliveryComponent
  }
];

export const deliveryRouting = RouterModule.forChild(deliveryRoutes);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    OrderModule,
    SharedModule,
    deliveryRouting,
    Ng4FilesModule,
    NgbModule.forRoot()
  ],
  declarations: [
    DeliveryComponent,
    DeliveryHeaderComponent,
    DeliveryListComponent,
    DeliveryModal
  ],
  providers: [
    DeliveryService,
		LoginGuard,
		Config
  ],
  entryComponents: 
	[
    DeliveryModal
  ],
  bootstrap: [DeliveryComponent]
})
export class DeliveryModule { }
